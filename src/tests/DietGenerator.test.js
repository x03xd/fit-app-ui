import { render, screen, fireEvent } from '@testing-library/react';
import DietGenerator from '../components/DietGenerator';
import '@testing-library/jest-dom';


test('renders input, dropdown, and button', () => {
  render(<DietGenerator />);

  expect(screen.getByPlaceholderText(/Enter desired calorie intake/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Generate Diet/i })).toBeInTheDocument();
  expect(screen.getByRole('combobox')).toBeInTheDocument();
});

test('allows input for calorie intake and selecting diet type', () => {
  render(<DietGenerator />);

  const calorieInput = screen.getByPlaceholderText(/Enter desired calorie intake/i);
  fireEvent.change(calorieInput, { target: { value: '2500' } });
  expect(calorieInput.value).toBe('2500');

  const dietSelect = screen.getByRole('combobox');
  fireEvent.change(dietSelect, { target: { value: 'keto' } });
  expect(dietSelect.value).toBe('keto');
});

test('generates diet based on selected type and calorie intake', () => {
  render(<DietGenerator />);

  const calorieInput = screen.getByPlaceholderText(/Enter desired calorie intake/i);
  const dietSelect = screen.getByRole('combobox');
  const generateButton = screen.getByRole('button', { name: /Generate Diet/i });

  fireEvent.change(calorieInput, { target: { value: '2200' } });
  fireEvent.change(dietSelect, { target: { value: 'balanced' } });
  fireEvent.click(generateButton);

  expect(screen.getByText(/Greek yogurt with honey and mixed berries/i)).toBeInTheDocument();
  expect(screen.getByText(/Yogurt: 220.00g - Protein: 11.00g, Fat: 5.50g, Carbs: 22.00g/i)).toBeInTheDocument();
});
