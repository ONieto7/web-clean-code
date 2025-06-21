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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5'
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          padding: 20,
          background: '#fff',
          borderRadius: 10,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <h2>{id ? `Editar Usuario ID: ${id}` : 'Crear Nuevo Usuario'}</h2>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '10px 0' }}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '10px 0' }}
        />
        <div style={{ margin: '10px 0' }}>
          <p>Elige un avatar:</p>
          <div style={{ display: 'flex', gap: 16 }}>
            {AVATARS.map((avatar, idx) => (
              <img
                key={idx}
                src={avatar}
                alt={`Avatar ${idx + 1}`}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: form.avatar === avatar ? '3px solid #007bff' : '2px solid #ccc',
                  cursor: 'pointer',
                }}
                onClick={() => handleAvatarSelect(avatar)}
              />
            ))}
          </div>
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default UserForm;

