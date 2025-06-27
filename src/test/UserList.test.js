import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserList from '../views/UserList';

jest.mock('../repositories/userRepository', () => ({
  getAll: jest.fn(() =>
    Promise.resolve({
      data: [
        { id: 1, first_name: 'Emma', last_name: 'Wong', email: 'emma.wong@reqres.in', avatar: 'avatar1.jpg' },
        { id: 2, first_name: 'Charles', last_name: 'Morris', email: 'charles.morris@reqres.in', avatar: 'avatar2.jpg' }
      ],
      total_pages: 1,
      page: 1
    })
  )
}));

test('navigates to user detail on user card click', async () => {
  render(
    <MemoryRouter>
      <UserList />
    </MemoryRouter>
  );

  const userCard = await screen.findByText(/Emma Wong/i);
  fireEvent.click(userCard);
});