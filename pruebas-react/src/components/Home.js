import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Prueba técnica: CRUD de usuarios</h1>
      <p>Bienvenido, elige una opción:</p>
      <button onClick={() => navigate('/usuarios')} style={{ margin: '10px' }}>
        Ver usuarios
      </button>
      <button onClick={() => navigate('/usuarios/nuevo')} style={{ margin: '10px' }}>
        Crear nuevo usuario
      </button>
    </div>
  );
}

export default Home;
