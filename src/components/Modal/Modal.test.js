import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

test('no renderiza nada si open es false', () => {
  render(<Modal open={false}>Contenido</Modal>);
  expect(screen.queryByText(/contenido/i)).not.toBeInTheDocument();
});

test('renderiza el contenido si open es true', () => {
  render(<Modal open={true}>Contenido visible</Modal>);
  expect(screen.getByText(/contenido visible/i)).toBeInTheDocument();
});

test('llama a onClose al hacer click en el botón de cerrar', () => {
  const handleClose = jest.fn();
  render(<Modal open={true} onClose={handleClose}>Contenido</Modal>);
  const closeBtn = screen.getByRole('button');
  userEvent.click(closeBtn);
  expect(handleClose).toHaveBeenCalledTimes(1);
});