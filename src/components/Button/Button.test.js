import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

test('renders the button and responds to click', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  const btn = screen.getByRole('button', { name: /click me/i });
  expect(btn).toBeInTheDocument();
  userEvent.click(btn);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('the button is disabled when the disabled prop is provided', () => {
  render(<Button disabled>Disabled</Button>);
  const btn = screen.getByRole('button', { name: /disabled/i });
  expect(btn).toBeDisabled();
});