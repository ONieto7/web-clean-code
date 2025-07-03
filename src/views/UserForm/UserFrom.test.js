import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserForm from './UserForm';
import userEvent from '@testing-library/user-event';

test('renders the form with basic fields', () => {
  render(
    <MemoryRouter>
      <UserForm />
    </MemoryRouter>
  );
  expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Apellido/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByText(/Crear Nuevo Usuario/i)).toBeInTheDocument();
});

test('displays available avatars', () => {
  render(
    <MemoryRouter>
      <UserForm />
    </MemoryRouter>
  );
  const avatars = screen.getAllByAltText(/avatar/i);
  expect(avatars.length).toBeGreaterThan(0);
});

test('allows typing in form fields', () => {
  render(
    <MemoryRouter>
      <UserForm />
    </MemoryRouter>
  );
  userEvent.type(screen.getByPlaceholderText(/Nombre/i), 'Juan');
  userEvent.type(screen.getByPlaceholderText(/Apellido/i), 'Pérez');
  userEvent.type(screen.getByPlaceholderText(/Email/i), 'juan@mail.com');
  expect(screen.getByPlaceholderText(/Nombre/i)).toHaveValue('Juan');
  expect(screen.getByPlaceholderText(/Apellido/i)).toHaveValue('Pérez');
  expect(screen.getByPlaceholderText(/Email/i)).toHaveValue('juan@mail.com');
});
