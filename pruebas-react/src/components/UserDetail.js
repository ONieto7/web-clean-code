import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, fetchUser } from '../services/userService'; 


function UserDetail({ userId, onBack, onUpdate }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(userId)
      .then(data => {
        if (!data.data) {
          setError('Detalles no disponibles para este usuario (API de prueba).');
        } else {
          setUser(data.data);
        }
      })
      .catch(() => setError('Error al cargar el usuario'));
  }, [userId]);

  const handleDelete = async () => {
    if (window.confirm('¿Seguro que quieres eliminar este usuario?')) {
      try {
        await deleteUser(userId);
        alert('Usuario eliminado');
        if (onUpdate) onUpdate(); 
        if (onBack) onBack();  
      } catch (err) {
        setError('Error al eliminar usuario');
      }
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Cargando detalles...</p>;

  return (
    <div>
      <h2>Detalles del Usuario</h2>
      <img src={user.avatar} alt={user.first_name} style={{ width: 100, borderRadius: '50%' }} />
      <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleDelete}>
        Eliminar usuario
      </button>
      <button
        onClick={() => {
          navigate(`/usuarios/${userId}/editar`);
          if (onUpdate) onUpdate();
          if (onBack) onBack();
        }}
        style={{ marginLeft: 16 }}
      >
        Editar usuario
      </button>
    </div>
  );
}

export default UserDetail;

