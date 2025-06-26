import * as userService from '../services/userService';

const UserRepository = {
  getAll: (page) => userService.fetchUsers(page),
  getById: (id) => userService.fetchUser(id),
  create: (data) => userService.createUser(data),
  update: (id, data) => userService.updateUser(id, data),
  delete: (id) => userService.deleteUser(id),
};

export default UserRepository;