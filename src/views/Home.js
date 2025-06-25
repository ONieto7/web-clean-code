import { useNavigate } from 'react-router-dom';
import './Home.css';
import Button from '../components/Button';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Prueba técnica: CRUD de usuarios</h1>
      <p>Bienvenido, elige una opción:</p>
      <div className="home-buttons">
        <Button onClick={() => navigate('/usuarios')}>
          Ver usuarios
        </Button>
        <Button onClick={() => navigate('/usuarios/nuevo')}>
          Crear nuevo usuario
        </Button>
      </div>
    </div>
  );
}

export default Home;
