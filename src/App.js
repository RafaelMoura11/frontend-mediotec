import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePage from './components/CreateUser';
import UserManagement from './pages/user-management/UserManagement';
import UserProfile from './pages/user-profile/user-profile';
import ModalClass from './pages/modal-class-list/modalClass';
import ClassManagement from './pages/class-management/classManagement';


function App() {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Página Principal</Link>
          </li>
          <li>
            <Link to="/create">Criar Usuário</Link>
          </li>
          <li>
            <Link to="/user-management">Gerenciamento de Usuários</Link>
          </li>
        </ul>
      </nav>   */}

      <Routes>
        {/* Página principal */}
        <Route path="/" element={<h1>Bem-vindo à Página Principal!</h1>} />
        {/* Rota para a CreatePage */}
        <Route path="/create" element={<CreatePage />} />
        {/* Rota para a UserManagement */}
        <Route path="/user-management" element={<UserManagement />} />
        {/* Rota para a UserProfile */}
        <Route path="/user-profile" element={<UserProfile />} />
        {/* Rota para a ClassManagement. */}
        <Route path="/class" element={<ClassManagement />} />
        {/* Rota para a ModalClass */}
        <Route path="/modal-class" element={<ModalClass />} />
      </Routes>
    </Router>
  );
}

export default App;

