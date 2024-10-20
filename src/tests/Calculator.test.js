import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../components/Calculator';
import '@testing-library/jest-dom';


describe('CalorieCalculator Component', () => {
  test('renders correctly', () => {
    render(<Calculator />);
    expect(screen.getByText(/Calorie Calculator/i)).toBeInTheDocument();
  });

  test('calculates calories based on inputs', () => {
    render(<Calculator />);

    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'male' } });
    fireEvent.change(screen.getByLabelText(/Weight \(kg\):/i), { target: { value: '70' } });
    fireEvent.change(screen.getByLabelText(/Height \(cm\):/i), { target: { value: '175' } });
    fireEvent.change(screen.getByLabelText(/Activity Level/i), { target: { value: 'normal' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(screen.getByText(/Your daily calorie intake should be:/i)).toBeInTheDocument();
    expect(screen.getByText(/Your daily calorie intake should be: [0-9]+\.[0-9]{2} kcal/i)).toBeInTheDocument();
  });

  test('displays an error message when inputs are empty', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
  });
  
  test('handles non-numeric inputs', () => {
    render(<Calculator />);

    fireEvent.change(screen.getByLabelText(/Age/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/Weight \(kg\):/i), { target: { value: 'invalid' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));
    
    expect(screen.getByText(/Please fill in all fields/i)).toBeInTheDocument();
  });
});
