import { render, screen, fireEvent } from '@testing-library/react';
import DifficultyButtonGroup from './DifficultyButtonGroup';

const props = {
  setDifficultyLevel: jest.fn()
};

test('renders Easy button', () => {
  render(<DifficultyButtonGroup {...props} />);

  const button = screen.getByText(/Easy/i);
  fireEvent.click(button);

  expect(button).toBeInTheDocument();
  expect(props.setDifficultyLevel).toHaveBeenCalledTimes(1);
});

test('renders Medium button', () => {
  render(<DifficultyButtonGroup {...props} />);

  const button = screen.getByText(/Medium/i);
  fireEvent.click(button);

  expect(button).toBeInTheDocument();
  expect(props.setDifficultyLevel).toHaveBeenCalledTimes(1);
});

test('renders Hard button', () => {
  render(<DifficultyButtonGroup {...props} />);

  const button = screen.getByText(/Hard/i);
  fireEvent.click(button);

  expect(button).toBeInTheDocument();
  expect(props.setDifficultyLevel).toHaveBeenCalledTimes(1);
});