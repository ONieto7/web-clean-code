import { render, screen } from '@testing-library/react';
import Alert from './Alert';

test('renders the message inside the alert', () => {
  render(<Alert>Alert message</Alert>);
  expect(screen.getByText(/alert message/i)).toBeInTheDocument();
});

test('uses the default class alert-info if no type is provided', () => {
  render(<Alert>Info</Alert>);
  const alert = screen.getByText(/info/i);
  expect(alert).toHaveClass('alert-info');
});

test('uses the class alert-success if type="success" is provided', () => {
  render(<Alert type="success">Success</Alert>);
  const alert = screen.getByText(/success/i);
  expect(alert).toHaveClass('alert-success');
});

test('uses the class alert-error if type="error" is provided', () => {
  render(<Alert type="error">Error</Alert>);
  const alert = screen.getByText(/error/i);
  expect(alert).toHaveClass('alert-error');
});