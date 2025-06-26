import React, { useEffect, useState, useCallback } from 'react';
import UserDetail from './UserDetail';
import './UserList.css';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Alert from '../components/Alert';
import Modal from '../components/Modal';

import userRepository from '../repositories/userRepository';
import { mapUserFromApi } from '../mappers/userMapper';

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = useCallback(async (pageNumber = page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await userRepository.getAll(pageNumber);
      const usersMapped = data.data.map(mapUserFromApi);
      setUsers(usersMapped);
      setTotalPages(data.total_pages);
      setPage(data.page);
    } catch (err) {
      setError(err.message || 'Error al cargar usuarios');
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchUsers(page);
  }, [page, fetchUsers]);

  useEffect(() => {
    setSelectedUserId(null);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    } 
  };

  const closeModal = () => setSelectedUserId(null);

  return (
    <div className="app-container">
      <h2>Listado de Usuarios - Página {page}</h2>

      {loading && <p>Cargando usuarios...</p>}
      {error && <Alert type="error">{error}</Alert>}

      <div className="user-grid">
        {users.map(user => (
          <div
            key={user.id}
            className="user-card"
            onClick={() => setSelectedUserId(user.id)}
          >
            <Avatar src={user.avatar} alt={user.first_name} size={60} className="user-avatar" />
            <div>
              <strong>{user.first_name} {user.last_name}</strong><br />
              <small>{user.email}</small>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handlePrev} disabled={page === 1}>Anterior</Button>
      <Button onClick={handleNext} disabled={page === totalPages}>Siguiente</Button>

      <Modal open={!!selectedUserId} onClose={closeModal}>
        <UserDetail
          userId={selectedUserId}
          onBack={closeModal}
          onUpdate={() => fetchUsers(page)}
        />
      </Modal>
    </div>
  );
}

export default UserList;

