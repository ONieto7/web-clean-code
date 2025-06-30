import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userRepository from '../repositories/userRepository';
import { mapUserFromApi } from '../mappers/userMapper';
import './UserDetail.css';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Alert from '../components/Alert';

function UserDetail({ userId, onBack, onUpdate }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    userRepository.getById(userId)
      .then(data => {
        if (!data?.data) {
          setError('Detalles no disponibles para este usuario (API de prueba).');
        } else {
          const mappedUser = mapUserFromApi(data.data);
          setUser(mappedUser);
        }
      })
      .catch(() => {
        setError('Error al cargar el usuario');
      });
  }, [userId]);

  const handleDelete = async () => {
    if (window.confirm('¿Seguro que quieres eliminar este usuario?')) {
      try {
        await userRepository.delete(userId);
        setSuccess('Usuario eliminado');
        onUpdate?.();
        onBack?.();
      } catch (err) {
        setError('Error al eliminar usuario');
      }
    }
  };

  if (error) {
    return <Alert type="error">{error}</Alert>;
  }

  if (!user) {
    return <Alert type="info">Cargando detalles...</Alert>;
  }

  return (
    <div>
      <h2>Detalles del Usuario</h2>
      {success && <Alert type="success">{success}</Alert>}
      <Avatar src={user.avatar} alt={user.first_name} size={100} />
      <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <Button onClick={handleDelete}>Eliminar usuario</Button>
      <Button
        onClick={() => {
          navigate(`/usuarios/${userId}/editar`);
          onUpdate?.();
          onBack?.();
        }}
        style={{ marginLeft: 16 }}
      >
        Editar usuario
      </Button>
    </div>
  );
}

export default UserDetail;


