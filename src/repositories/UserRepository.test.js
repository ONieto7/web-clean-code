import userRepository from './userRepository';
import * as userService from '../services/userService';

// Mock de todas las funciones del userService
jest.mock('../services/userService');

describe('userRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia mocks antes de cada test
  });

  test('getAll devuelve usuarios', async () => {
    const mockUsers = { data: [{ id: 1, name: 'Oscar' }] };
    userService.fetchUsers.mockResolvedValue(mockUsers);

    const result = await userRepository.getAll(1);
    expect(userService.fetchUsers).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUsers);
  });

  test('getById devuelve un usuario', async () => {
    const mockUser = { data: { id: 1, name: 'Oscar' } };
    userService.fetchUser.mockResolvedValue(mockUser);

    const result = await userRepository.getById(1);
    expect(userService.fetchUser).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  test('create crea un usuario', async () => {
    const newUser = { name: 'Nuevo' };
    const createdUser = { data: { id: 2, name: 'Nuevo' } };
    userService.createUser.mockResolvedValue(createdUser);

    const result = await userRepository.create(newUser);
    expect(userService.createUser).toHaveBeenCalledWith(newUser);
    expect(result).toEqual(createdUser);
  });

  test('update actualiza un usuario', async () => {
    const updatedUser = { name: 'Actualizado' };
    const updatedResponse = { data: { id: 1, name: 'Actualizado' } };
    userService.updateUser.mockResolvedValue(updatedResponse);

    const result = await userRepository.update(1, updatedUser);
    expect(userService.updateUser).toHaveBeenCalledWith(1, updatedUser);
    expect(result).toEqual(updatedResponse);
  });

  test('delete elimina un usuario', async () => {
    const mockResponse = { ok: true };
    userService.deleteUser.mockResolvedValue(mockResponse);

    const result = await userRepository.delete(1);
    expect(userService.deleteUser).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockResponse);
  });
});
