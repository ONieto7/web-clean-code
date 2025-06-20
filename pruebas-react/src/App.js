import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import UserForm from "./components/UserForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/usuarios" />} />
          <Route path="/usuarios" element={<UserList />} />
          <Route path="/usuarios/nuevo" element={<UserForm />} />
          <Route path="/usuarios/:id" element={<UserDetail />} />
          <Route path="/usuarios/:id/editar" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

