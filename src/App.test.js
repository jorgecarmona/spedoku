import { render, screen } from '@testing-library/react';
import App from './App';

describe('UI elements', () => {
  test('renders app title', () => {
    render(<App />);
  
    const label = screen.getByText(/SPEDOKU/i);
    expect(label).toBeInTheDocument();
  });

  test('renders controls title', () => {
    render(<App />);
  
    const label = screen.getByText(/Puzzle Controls/i);
    expect(label).toBeInTheDocument();
  });
});

describe('Solve button', () => {
  test('renders Solve button', () => {
    render(<App />);

    const button = screen.getByText(/Solve Now/i);
    expect(button).toBeInTheDocument();
  });
});

describe('Clear button', () => {
  test('renders Clear button', () => {
    render(<App />);

    const button = screen.getByText(/Clear/i);
    expect(button).toBeInTheDocument();
  });
});
