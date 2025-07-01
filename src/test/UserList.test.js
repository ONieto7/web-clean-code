import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserList from '../views/UserList';

jest.mock('../repositories/userRepository', () => ({
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

  test('renderiza el título de la lista', async () => {
    require('../repositories/userRepository').getAll.mockResolvedValue(mockUsers);
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );
    expect(screen.getByText(/Listado de Usuarios/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Oscar Pérez/i)).toBeInTheDocument();
      expect(screen.getByText(/Ana López/i)).toBeInTheDocument();
    });
  });

  test('muestra mensaje de carga', async () => {
    require('../repositories/userRepository').getAll.mockImplementation(() => new Promise(() => {}));
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cargando usuarios/i)).toBeInTheDocument();
  });

  test('muestra mensaje de error si la API falla', async () => {
    require('../repositories/userRepository').getAll.mockRejectedValue(new Error('Error de API'));
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Error de API/i)).toBeInTheDocument();
    });
  });

  test('botón siguiente está deshabilitado en la última página', async () => {
    require('../repositories/userRepository').getAll.mockResolvedValue({ ...mockUsers, page: 2 });
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Siguiente/i })).toBeDisabled();
    });
  });

  test('botón anterior está deshabilitado en la primera página', async () => {
    require('../repositories/userRepository').getAll.mockResolvedValue({ ...mockUsers, page: 1 });
    render(
      <MemoryRouter>
        <UserList />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Anterior/i })).toBeDisabled();
    });
  });
});

