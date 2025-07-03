import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

test('renders the image with the correct src and alt', () => {
  render(<Avatar src="avatar.jpg" alt="User avatar" />);
  const img = screen.getByAltText(/user avatar/i);
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'avatar.jpg');
});

test('uses a default alt if the alt prop is not provided', () => {
  render(<Avatar src="avatar.jpg" />);
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('alt');
});