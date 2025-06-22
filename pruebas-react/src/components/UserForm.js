import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createUser, fetchUser, updateUser } from '../services/userService';

const AVATARS = [
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/men/3.jpg',
];

function UserForm() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', email: '', avatar: AVATARS[0] });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar datos si hay id (modo edición)
  useEffect(() => {
    if (id) {
      fetchUser(id)
        .then(data => {
          const user = data.data;
          setForm({
            name: user.first_name || '',
            email: user.email || '',
            avatar: user.avatar || AVATARS[0]
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
    try {
      if (id) {
        await updateUser(id, form);
        alert('Usuario actualizado');
      } else {
        await createUser(form);
        alert('Usuario creado');
      }
      navigate('/usuarios');
    } catch {
      setError(id ? 'Error al actualizar usuario' : 'Error al crear usuario');
    }
  };

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>{id ? `Editar Usuario ID: ${id}` : 'Crear Nuevo Usuario'}</h2>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
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
              <img
                key={idx}
                src={avatar}
                alt={`Avatar ${idx + 1}`}
                className={form.avatar === avatar ? 'selected' : ''}
                onClick={() => handleAvatarSelect(avatar)}
              />
            ))}
          </div>
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default UserForm;

