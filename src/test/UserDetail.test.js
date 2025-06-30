import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userRepository from '../repositories/userRepository';

// Aquí está el mock que debes corregir
jest.mock('../repositories/userRepository', () => ({
  __esModule: true,
  default: {
    getById: jest.fn(() =>
      Promise.resolve({
        data: {
          id: 1,
          first_name: 'Emma',
          last_name: 'Wong',
          email: 'emma.wong@reqres.in',
          avatar: 'avatar1.jpg'
        }
      })
    ),
    delete: jest.fn(() => Promise.resolve())
  }
}));

import UserDetail from '../views/UserDetail';

test('renders user detail with name and email', async () => {
  render(
    <MemoryRouter>
      <UserDetail userId={1} onBack={() => {}} onUpdate={() => {}} />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Emma Wong/i)).toBeInTheDocument();
  expect(await screen.findByText(/emma.wong@reqres.in/i)).toBeInTheDocument();
});
