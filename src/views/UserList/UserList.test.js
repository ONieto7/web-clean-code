import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserList from './UserList';

jest.mock('../../repositories/userRepository', () => ({
  getAll: jest.fn(),
}));

const mockUsers = {
  data: [
    { id: 1, first_name: 'Oscar', last_name: 'Pérez', email: 'oscar@mail.com', avatar: 'avatar1.jpg' },
    { id: 2, first_name: 'Ana', last_name: 'López', email: 'ana@mail.com', avatar: 'avatar2.jpg' },
  ],
  total_pages: 2,
  page: 1,
};

describe('UserList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the user list title', async () => {
    require('../../repositories/userRepository').getAll.mockResolvedValue(mockUsers);
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );
    expect(screen.getByText(/Listado de Usuarios/i)).toBeInTheDocument();
    // Esperamos que aparezcan los usuarios con findByText (async)
    expect(await screen.findByText(/Oscar Pérez/i)).toBeInTheDocument();
    expect(await screen.findByText(/Ana López/i)).toBeInTheDocument();
  });

  test('shows loading message', () => {
    require('../../repositories/userRepository').getAll.mockImplementation(() => new Promise(() => {}));
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cargando usuarios/i)).toBeInTheDocument();
  });

  test('shows error message if API fails', async () => {
    require('../../repositories/userRepository').getAll.mockRejectedValue(new Error('Error de API'));
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Error de API/i)).toBeInTheDocument();
  });

  test('next button is disabled on last page', async () => {
    require('../../repositories/userRepository').getAll.mockResolvedValue({ ...mockUsers, page: 2 });
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );
    expect(await screen.findByRole('button', { name: /Siguiente/i })).toBeDisabled();
  });

  test('previous button is disabled on first page', async () => {
    require('../../repositories/userRepository').getAll.mockResolvedValue({ ...mockUsers, page: 1 });
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );
    expect(await screen.findByRole('button', { name: /Anterior/i })).toBeDisabled();
  });
});



