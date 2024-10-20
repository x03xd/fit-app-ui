import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login';
import AuthContext from '../components/AuthContext';

const mockHandleLogin = jest.fn();

const renderWithContext = () => {
  return render(
    <AuthContext.Provider value={{ handleLogin: mockHandleLogin }}>
      <Login />
    </AuthContext.Provider>
  );
};

test('renders login form with inputs and login button', () => {
  renderWithContext();

  expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
});

test('allows entering username and password', () => {
  renderWithContext();

  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(usernameInput.value).toBe('testuser');
  expect(passwordInput.value).toBe('password123');
});

test('submits form and calls handleLogin with correct credentials', () => {
  renderWithContext();

  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const loginButton = screen.getByRole('button', { name: /Login/i });

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  fireEvent.click(loginButton);

  expect(mockHandleLogin).toHaveBeenCalledWith('testuser', 'password123');
});
