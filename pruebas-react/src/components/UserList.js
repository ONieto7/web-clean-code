import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`);
      if (!response.ok) throw new Error('Error al cargar usuarios');
      const data = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
      setPage(data.page);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div>
      <h2>Listado de Usuarios - Página {page}</h2>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: '20px' }}>
            <img src={user.avatar} alt={user.first_name} style={{ width: 50, borderRadius: '50%' }} />
            <div>
              <strong>{user.first_name} {user.last_name}</strong><br />
              <small>{user.email}</small>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handlePrev} disabled={page === 1}>Anterior</button>
      <button onClick={handleNext} disabled={page === totalPages}>Siguiente</button>
    </div>
  );
}

export default UserList;


