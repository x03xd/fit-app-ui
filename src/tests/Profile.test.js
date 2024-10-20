import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../components/Profile';
import AuthContext from '../components/AuthContext';

jest.mock('../consts.js', () => ({
  parsedCookies: {
    username: 'testuser',
    name: 'Test Name',
    email: 'test@example.com',
  },
}));

const mockLogout = jest.fn();

const renderWithContext = () => {
  return render(
    <AuthContext.Provider value={{ logout: mockLogout }}>
      <Profile />
    </AuthContext.Provider>
  );
};

test('switches to diet generator tab', () => {
  renderWithContext();

  fireEvent.click(screen.getByRole('button', { name: /Diet Generator/i }));
  expect(screen.getByText(/Diet Generator/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Diet Generator/i })).toHaveClass('active');
});

test('logout button triggers logout function', () => {
  renderWithContext();

  fireEvent.click(screen.getByRole('button', { name: /Logout/i }));
  expect(mockLogout).toHaveBeenCalled();
});
