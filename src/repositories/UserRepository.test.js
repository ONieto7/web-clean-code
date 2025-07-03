import userRepository from './userRepository';
import * as userService from '../services/userService';

jest.mock('../services/userService');

describe('userRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll returns users', async () => {
    const mockUsers = { data: [{ id: 1, name: 'Oscar' }] };
    userService.fetchUsers.mockResolvedValue(mockUsers);

    const result = await userRepository.getAll(1);
    expect(userService.fetchUsers).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUsers);
  });

  test('getById returns a user', async () => {
    const mockUser = { data: { id: 1, name: 'Oscar' } };
    userService.fetchUser.mockResolvedValue(mockUser);

    const result = await userRepository.getById(1);
    expect(userService.fetchUser).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  test('create creates a user', async () => {
    const newUser = { name: 'New' };
    const createdUser = { data: { id: 2, name: 'New' } };
    userService.createUser.mockResolvedValue(createdUser);

    const result = await userRepository.create(newUser);
    expect(userService.createUser).toHaveBeenCalledWith(newUser);
    expect(result).toEqual(createdUser);
  });

  test('update updates a user', async () => {
    const updatedUser = { name: 'Updated' };
    const updatedResponse = { data: { id: 1, name: 'Updated' } };
    userService.updateUser.mockResolvedValue(updatedResponse);

    const result = await userRepository.update(1, updatedUser);
    expect(userService.updateUser).toHaveBeenCalledWith(1, updatedUser);
    expect(result).toEqual(updatedResponse);
  });

  test('delete removes a user', async () => {
    const mockResponse = { ok: true };
    userService.deleteUser.mockResolvedValue(mockResponse);

    const result = await userRepository.delete(1);
    expect(userService.deleteUser).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockResponse);
  });
});
