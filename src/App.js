import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/login/Login';
import UserManagement from './pages/user-management/UserManagement';
import HomePage from './pages/home/HomePage'
import CourseManagement from './pages/course-menagement/CourseMenagement';

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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/course-management" element={<CourseManagement />} />
{/*     <Route path="/class-management" element={<ClassManagement />} />
        <Route path="/notification-management" element={<NotificationManagement />} />
 */}      </Routes>
    </Router>
  );
}

export default App;

