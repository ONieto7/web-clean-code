import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserDetail from './UserDetail';
import userEvent from '@testing-library/user-event';

jest.mock('../../repositories/userRepository', () => ({
  getById: jest.fn(),
}));

const mockUser = {
  data: {
    id: 1,
    first_name: 'Oscar',
    last_name: 'Pérez',
    email: 'oscar@mail.com',
    avatar: 'avatar.jpg',
  },
};

describe('UserDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading message and then user data when API responds successfully', async () => {
    require('../../repositories/userRepository').getById.mockResolvedValue(mockUser);

    render(
      <MemoryRouter>
        <UserDetail userId={1} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando detalles/i)).toBeInTheDocument();

    expect(await screen.findByText(/Oscar Pérez/i)).toBeInTheDocument();
    expect(await screen.findByText(/oscar@mail.com/i)).toBeInTheDocument();
  });

  test('displays loading message and then error message when API fails', async () => {
    require('../../repositories/userRepository').getById.mockRejectedValue(new Error('API Error'));

    render(
      <MemoryRouter>
        <UserDetail userId={1} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando detalles/i)).toBeInTheDocument();

    expect(await screen.findByText(/Error al cargar el usuario/i)).toBeInTheDocument();
  });

  test('displays "details not available" message when API returns no data', async () => {
    require('../../repositories/userRepository').getById.mockResolvedValue({});

    render(
      <MemoryRouter>
        <UserDetail userId={1} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando detalles/i)).toBeInTheDocument();

    expect(await screen.findByText(/Detalles no disponibles/i)).toBeInTheDocument();
  });

  test('deletes user and displays success message', async () => {
    const mockDelete = jest.fn().mockResolvedValue({});
    require('../../repositories/userRepository').getById.mockResolvedValue(mockUser);
    require('../../repositories/userRepository').delete = mockDelete;

    window.confirm = jest.fn(() => true);

    render(
      <MemoryRouter>
        <UserDetail userId={1} />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Oscar Pérez/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/Eliminar usuario/i));

    expect(await screen.findByText(/Usuario eliminado/i)).toBeInTheDocument();
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});
