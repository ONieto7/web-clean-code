import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserDetail from './UserDetail';

jest.mock('../services/userService', () => ({
  fetchUser: jest.fn((id) =>
    Promise.resolve({
      data: id === '1'
        ? { id: 1, first_name: 'Oscar', last_name: 'Test', email: 'oscar@test.com', avatar: 'avatar.jpg' }
        : null
    })
  ),
  deleteUser: jest.fn(() => Promise.resolve())
}));

test('shows user details if user exists', async () => {
  render(
    <MemoryRouter>
      <UserDetail userId="1" />
    </MemoryRouter>
  );
  expect(screen.getByText(/Cargando detalles/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText(/Oscar Test/i)).toBeInTheDocument());
  expect(screen.getByText(/oscar@test.com/i)).toBeInTheDocument();
});

test('shows error if user does not exist', async () => {
  render(
    <MemoryRouter>
      <UserDetail userId="99" />
    </MemoryRouter>
  );
  await waitFor(() => expect(screen.getByText(/Detalles no disponibles/i)).toBeInTheDocument());
});