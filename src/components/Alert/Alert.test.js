import { render, screen } from '@testing-library/react';
import Alert from './Alert';

test('renderiza el mensaje dentro de la alerta', () => {
  render(<Alert>Mensaje de alerta</Alert>);
  expect(screen.getByText(/mensaje de alerta/i)).toBeInTheDocument();
});

test('usa la clase por defecto alert-info si no se pasa type', () => {
  render(<Alert>Info</Alert>);
  const alert = screen.getByText(/info/i);
  expect(alert).toHaveClass('alert-info');
});

test('usa la clase alert-success si se pasa type="success"', () => {
  render(<Alert type="success">Éxito</Alert>);
  const alert = screen.getByText(/éxito/i);
  expect(alert).toHaveClass('alert-success');
});

test('usa la clase alert-error si se pasa type="error"', () => {
  render(<Alert type="error">Error</Alert>);
  const alert = screen.getByText(/error/i);
  expect(alert).toHaveClass('alert-error');
});