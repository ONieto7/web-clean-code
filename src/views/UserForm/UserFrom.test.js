import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

const newUserRoute = '/usuarios/nuevo';

test('renders the form with basic fields inside the full app', () => {
  window.history.pushState({}, 'Test page', newUserRoute);
  render(<App />);

  expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Apellido/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByText(/Crear Nuevo Usuario/i)).toBeInTheDocument();
});

test('displays available avatars inside the full app', () => {
  window.history.pushState({}, 'Test page', newUserRoute);
  render(<App />);

  const avatars = screen.getAllByAltText(/avatar/i);
  expect(avatars.length).toBeGreaterThan(0);
});

test('allows typing in form fields inside the full app', () => {
  window.history.pushState({}, 'Test page', newUserRoute);
  render(<App />);

  userEvent.type(screen.getByPlaceholderText(/Nombre/i), 'Juan');
  userEvent.type(screen.getByPlaceholderText(/Apellido/i), 'Pérez');
  userEvent.type(screen.getByPlaceholderText(/Email/i), 'juan@mail.com');

  expect(screen.getByPlaceholderText(/Nombre/i)).toHaveValue('Juan');
  expect(screen.getByPlaceholderText(/Apellido/i)).toHaveValue('Pérez');
  expect(screen.getByPlaceholderText(/Email/i)).toHaveValue('juan@mail.com');
});


