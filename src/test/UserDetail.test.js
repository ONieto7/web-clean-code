import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserDetail from '../views/UserDetail';
import userEvent from '@testing-library/user-event';

jest.mock('../repositories/userRepository', () => ({
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

  test('muestra mensaje de carga y luego los datos del usuario si la API responde bien', async () => {
    require('../repositories/userRepository').getById.mockResolvedValue(mockUser);
    render(
      <MemoryRouter>
        <UserDetail userId={1} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cargando detalles/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Oscar Pérez/i)).toBeInTheDocument();
      expect(screen.getByText(/oscar@mail.com/i)).toBeInTheDocument();
    });
  });

  test('muestra mensaje de carga y luego error si la API falla', async () => {
    require('../repositories/userRepository').getById.mockRejectedValue(new Error('API Error'));
    render(
      <MemoryRouter>
        <UserDetail userId={1} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cargando detalles/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Error al cargar el usuario/i)).toBeInTheDocument();
    });
  });

  test('muestra mensaje de detalles no disponibles si la API responde sin datos', async () => {
    require('../repositories/userRepository').getById.mockResolvedValue({});
    render(
      <MemoryRouter>
        <UserDetail userId={1} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cargando detalles/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Detalles no disponibles/i)).toBeInTheDocument();
    });
  });

  test('elimina usuario y muestra mensaje de éxito', async () => {
    const mockDelete = jest.fn().mockResolvedValue({});
    require('../repositories/userRepository').getById.mockResolvedValue(mockUser);
    require('../repositories/userRepository').delete = mockDelete;
    window.confirm = jest.fn(() => true);

    render(
      <MemoryRouter>
        <UserDetail userId={1} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Oscar Pérez/i)).toBeInTheDocument();
    });

    userEvent.click(screen.getByText(/Eliminar usuario/i));

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith(1);
      expect(screen.getByText(/Usuario eliminado/i)).toBeInTheDocument();
    });
  });
});
