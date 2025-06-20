import React from 'react';
import { useParams } from 'react-router-dom';

function UserForm() {
  const { id } = useParams();
  return <h2>{id ? `Editar Usuario ID: ${id}` : 'Crear Nuevo Usuario'}</h2>;
}

export default UserForm;
