import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import UserManagement from './pages/user-management/UserManagement';


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
      </Routes>
    </Router>
  );
}

export default App;

