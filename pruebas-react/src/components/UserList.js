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
    <div>
      <h2>Listado de Usuarios - Página {page}</h2>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li
            key={user.id}
            style={{ marginBottom: '20px', cursor: 'pointer' }}
          >
            <img
              src={user.avatar}
              alt={user.first_name}
              style={{ width: 50, borderRadius: '50%' }}
              onClick={() => setSelectedUserId(user.id)}
            />
            <div>
              <strong>{user.first_name} {user.last_name}</strong><br />
              <small>{user.email}</small>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handlePrev} disabled={page === 1}>Anterior</button>
      <button onClick={handleNext} disabled={page === totalPages}>Siguiente</button>

      {/* Modal */}
      {selectedUserId && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, position: 'relative'
          }}>
            <button
              onClick={closeModal}
              style={{
                position: 'absolute', top: 8, right: 8, background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer'
              }}
            >×</button>
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
