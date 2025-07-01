import { render, screen } from '@testing-library/react';
import App from '../App';

test('renderiza la vista Home en la ruta raíz', () => {
  render(<App />);
  expect(screen.getByText(/prueba técnica: CRUD de usuarios/i)).toBeInTheDocument();
});
