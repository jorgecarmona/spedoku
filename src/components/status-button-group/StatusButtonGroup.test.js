import { render, screen, fireEvent } from '@testing-library/react';
import StatusButtonGroup from './StatusButtonGroup';

describe('left status button group', () => {
  const props = {
    buttonLocation: 'left',
    buttonLabel: 'Validate',
    textSectionLabel: 'unsolved',
    trigger: jest.fn()
  };

  test('renders trigger button', () => {
    render(<StatusButtonGroup {...props} />);

    const button = screen.getByText(/Validate/i);
    expect(button).toBeInTheDocument();
  });

  test('trigger button calls trigger function', () => {
    render(<StatusButtonGroup {...props} />);

    const button = screen.getByText(/Validate/i);
    fireEvent.click(button);
    
    expect(props.trigger).toHaveBeenCalledTimes(1);
  });

  test('renders text section', () => {
    render(<StatusButtonGroup {...props} />);

    const button = screen.getByText(/unsolved/i);
    expect(button).toBeInTheDocument();
  });
});

describe('right status button group', () => {
  const props = {
    buttonLocation: 'right',
    buttonLabel: 'Difficulty',
    textSectionLabel: 'medium',
    trigger: jest.fn()
  };

  test('renders trigger button', () => {
    render(<StatusButtonGroup {...props} />);

    const button = screen.getByText(/Difficulty/i);
    expect(button).toBeInTheDocument();
  });

  test('trigger button calls trigger function', () => {
    render(<StatusButtonGroup {...props} />);

    const button = screen.getByText(/Difficulty/i);
    fireEvent.click(button);
    
    expect(props.trigger).toHaveBeenCalledTimes(1);
  });

  test('renders text section', () => {
    render(<StatusButtonGroup {...props} />);

    const button = screen.getByText(/medium/i);
    expect(button).toBeInTheDocument();
  });
});