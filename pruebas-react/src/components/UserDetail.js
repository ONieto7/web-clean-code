import React from 'react';
import { useParams } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  return <h2>Detalle de Usuario ID: {id}</h2>;
}

export default UserDetail;
