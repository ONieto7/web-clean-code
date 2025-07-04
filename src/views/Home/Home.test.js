import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders home page content', () => {
    render(<App />);
    expect(screen.getByText(/Prueba técnica: CRUD de usuarios/i)).toBeInTheDocument();
    expect(screen.getByText(/Ver usuarios/i)).toBeInTheDocument();
    expect(screen.getByText(/Crear nuevo usuario/i)).toBeInTheDocument();
  });

  test('navigates to /usuarios when "Ver usuarios" button is clicked', async () => {
    render(<App />);
    await userEvent.click(screen.getByText(/Ver usuarios/i));
    expect(mockNavigate).toHaveBeenCalledWith('/usuarios');
  });

  test('navigates to /usuarios/nuevo when "Crear nuevo usuario" button is clicked', async () => {
    render(<App />);
    await userEvent.click(screen.getByText(/Crear nuevo usuario/i));
    expect(mockNavigate).toHaveBeenCalledWith('/usuarios/nuevo');
  });
});


