import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './views/Home';
import UserList from './views/UserList';
import UserDetail from './views/UserDetail';
import UserForm from './views/UserForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<UserList />} />
          <Route path="/usuarios/nuevo" element={<UserForm />} />
          <Route path="/usuarios/:id" element={<UserDetail />} />
          <Route path="/usuarios/:id/editar" element={<UserForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
