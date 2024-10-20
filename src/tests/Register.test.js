import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../components/Register';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Register Component', () => {
    test('allows users to fill out the form', () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: 'password123' },
        });
        fireEvent.change(screen.getByLabelText(/First Name/i), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'john@example.com' },
        });

        expect(screen.getByLabelText(/Username/i).value).toBe('testuser');
        expect(screen.getByLabelText(/Password/i).value).toBe('password123');
        expect(screen.getByLabelText(/First Name/i).value).toBe('John');
        expect(screen.getByLabelText(/Email/i).value).toBe('john@example.com');
    });

    test('submits the form with correct data', async () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );

        fireEvent.change(screen.getByLabelText(/Username/i), {
            target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: 'password123' },
        });
        fireEvent.change(screen.getByLabelText(/First Name/i), {
            target: { value: 'John' },
        });
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'john@example.com' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Register/i }));

        await screen.findByText(/Register for FitLife App/i);
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api/register/', expect.any(Object));
        expect(global.fetch).toHaveBeenCalledTimes(1);

        global.fetch.mockClear();
    });
});
