import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import App from '../components/App';
import '@testing-library/jest-dom';


describe('App Component', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to FitLife App/i)).toBeInTheDocument();
    
    expect(screen.getByText(/Track your calories, generate diet plans, and monitor your weight loss progress!/i)).toBeInTheDocument();
  });

  test('renders login and register buttons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
  });

  test('login and register buttons have correct links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /Login/i })).toHaveAttribute('href', '/login');
    expect(screen.getByRole('link', { name: /Register/i })).toHaveAttribute('href', '/register');
  });
});
