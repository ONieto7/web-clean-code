import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Prueba técnica: CRUD de usuarios</h1>
      <p>Bienvenido, elige una opción:</p>
      <div className="home-buttons">
        <button onClick={() => navigate('/usuarios')}>
          Ver usuarios
        </button>
        <button onClick={() => navigate('/usuarios/nuevo')}>
          Crear nuevo usuario
        </button>
      </div>
    </div>
  );
}

export default Home;
