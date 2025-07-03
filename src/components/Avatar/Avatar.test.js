import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

test('renderiza la imagen con el src y alt correctos', () => {
  render(<Avatar src="avatar.jpg" alt="Avatar de usuario" />);
  const img = screen.getByAltText(/avatar de usuario/i);
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'avatar.jpg');
});

test('usa un alt por defecto si no se pasa la prop alt', () => {
  render(<Avatar src="avatar.jpg" />);
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('alt');
});