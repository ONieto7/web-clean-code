import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

test('does not render anything if open is false', () => {
  render(<Modal open={false}>Content</Modal>);
  expect(screen.queryByText(/content/i)).not.toBeInTheDocument();
});

test('renders the content if open is true', () => {
  render(<Modal open={true}>Visible content</Modal>);
  expect(screen.getByText(/visible content/i)).toBeInTheDocument();
});

test('calls onClose when clicking the close button', () => {
  const handleClose = jest.fn();
  render(<Modal open={true} onClose={handleClose}>Content</Modal>);
  const closeBtn = screen.getByRole('button');
  userEvent.click(closeBtn);
  expect(handleClose).toHaveBeenCalledTimes(1);
});