import React, { useEffect, useState, useCallback } from 'react';
import UserDetail from './UserDetail';

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
      const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`, {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      });
      if (!response.ok) throw new Error('Error al cargar usuarios');
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
      setPage(data.page);
    } catch (err) {
      setError(err.message);
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
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const closeModal = () => setSelectedUserId(null);

  return (
    <div className="app-container">
      <h2>Listado de Usuarios - Página {page}</h2>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="user-grid">
        {users.map(user => (
          <div
            key={user.id}
            className="user-card"
            onClick={() => setSelectedUserId(user.id)}
          >
            <img
              src={user.avatar}
              alt={user.first_name}
              className="user-avatar"
            />
            <div>
              <strong>{user.first_name} {user.last_name}</strong><br />
              <small>{user.email}</small>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handlePrev} disabled={page === 1}>Anterior</button>
      <button onClick={handleNext} disabled={page === totalPages}>Siguiente</button>

      {selectedUserId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={closeModal}
              className="close-modal-btn"
            >
              ×
            </button>
            <UserDetail
              userId={selectedUserId}
              onBack={closeModal}
              onUpdate={() => fetchUsers(page)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
