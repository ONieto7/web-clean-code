import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import * as userRepository from '../../repositories/userRepository'; 

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

const usersRoute = '/usuarios'; 

describe('UserList dentro de App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the user list title', async () => {
    userRepository.getAll.mockResolvedValue(mockUsers);
    window.history.pushState({}, 'User list', usersRoute);
    render(<App />);

    expect(screen.getByText(/Listado de Usuarios/i)).toBeInTheDocument();

    expect(await screen.findByText(/Oscar Pérez/i)).toBeInTheDocument();
    expect(await screen.findByText(/Ana López/i)).toBeInTheDocument();
  });

  test('shows loading message', () => {
    userRepository.getAll.mockImplementation(() => new Promise(() => {}));
    window.history.pushState({}, 'User list', usersRoute);
    render(<App />);

    expect(screen.getByText(/Cargando usuarios/i)).toBeInTheDocument();
  });

  test('shows error message if API fails', async () => {
    userRepository.getAll.mockRejectedValue(new Error('Error de API'));
    window.history.pushState({}, 'User list', usersRoute);
    render(<App />);

    expect(await screen.findByText(/Error de API/i)).toBeInTheDocument();
  });

  test('next button is disabled on last page', async () => {
    userRepository.getAll.mockResolvedValue({ ...mockUsers, page: 2 });
    window.history.pushState({}, 'User list', usersRoute);
    render(<App />);

    expect(await screen.findByRole('button', { name: /Siguiente/i })).toBeDisabled();
  });

  test('previous button is disabled on first page', async () => {
    userRepository.getAll.mockResolvedValue({ ...mockUsers, page: 1 });
    window.history.pushState({}, 'User list', usersRoute);
    render(<App />);

    expect(await screen.findByRole('button', { name: /Anterior/i })).toBeDisabled();
  });
});




