import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserManagement from './pages/user-management/UserManagement';
import HomePage from './pages/home/HomePage'

import Navbar from './components/navbar/navBar';

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
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;

