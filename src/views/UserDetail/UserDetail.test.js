import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import * as userRepository from '../../repositories/userRepository';

jest.mock('../../repositories/userRepository', () => ({
  getById: jest.fn(),
  delete: jest.fn(),
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

describe('UserDetail inside App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.history.pushState({}, 'User detail', '/usuarios/1');
  });

  test('shows loading and then user data when API responds successfully', async () => {
    userRepository.getById.mockResolvedValue(mockUser);

    render(<App />);

    expect(screen.getByText(/Cargando detalles/i)).toBeInTheDocument();
    expect(await screen.findByText(/Oscar Pérez/i)).toBeInTheDocument();
    expect(await screen.findByText(/oscar@mail.com/i)).toBeInTheDocument();
  });

  test('shows loading and then error message when API fails', async () => {
    userRepository.getById.mockRejectedValue(new Error('API Error'));

    render(<App />);

    expect(screen.getByText(/Cargando detalles/i)).toBeInTheDocument();
    expect(await screen.findByText(/Error al cargar el usuario/i)).toBeInTheDocument();
  });

  test('shows loading and then no details available message when API returns empty', async () => {
    userRepository.getById.mockResolvedValue({});

    render(<App />);

    expect(screen.getByText(/Cargando detalles/i)).toBeInTheDocument();
    expect(await screen.findByText(/Detalles no disponibles/i)).toBeInTheDocument();
  });
});

