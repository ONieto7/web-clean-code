import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userRepository from '../repositories/userRepository';
import { mapUserFromApi, mapUserToApi } from '../mappers/userMapper';
import './UserForm.css';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Alert from '../components/Alert';

const AVATARS = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
];

function UserForm() {
  const { id } = useParams();
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', avatar: AVATARS[0] });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      userRepository.getById(id)
        .then(data => {
          if (!data?.data) {
            setError('Error: usuario no encontrado');
            return;
          }
          const user = mapUserFromApi(data.data);
          setForm({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            avatar: user.avatar || AVATARS[0],
          });
        })
        .catch(() => setError('Error al cargar usuario'));
    }
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = avatarUrl => {
    setForm({ ...form, avatar: avatarUrl });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess('');
    try {
      const apiUser = mapUserToApi(form);
      if (id) {
        await userRepository.update(id, apiUser);
        setSuccess('Usuario actualizado');
      } else {
        await userRepository.create(apiUser);
        setSuccess('Usuario creado');
      }
      setTimeout(() => navigate('/usuarios'), 1000);
    } catch {
      setError(id ? 'Error al actualizar usuario' : 'Error al crear usuario');
    }
  };

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>{id ? `Editar Usuario ID: ${id}` : 'Crear Nuevo Usuario'}</h2>
        <input
          name="first_name"
          placeholder="Nombre"
          value={form.first_name}
          onChange={handleChange}
          required
        />
        <input
          name="last_name"
          placeholder="Apellido"
          value={form.last_name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <div>
          <p>Elige un avatar:</p>
          <div className="avatar-list">
            {AVATARS.map((avatar, idx) => (
              <Avatar
                key={idx}
                src={avatar}
                alt={`Avatar ${idx + 1}`}
                size={60}
                className={form.avatar === avatar ? 'selected' : ''}
                onClick={() => handleAvatarSelect(avatar)}
              />
            ))}
          </div>
        </div>
        <Button type="submit">{id ? 'Actualizar' : 'Crear'}</Button>
        {success && <Alert type="success">{success}</Alert>}
        {error && <Alert type="error">{error}</Alert>}
      </form>
    </div>
  );
}

export default UserForm;


