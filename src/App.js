import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import UserManagement from './pages/user-management/UserManagement';
import UserProfile from './pages/user-profile/user-profile';
import ModalClass from './pages/modal-class-list/modalClass';
import ClassManagement from './pages/class-management/classManagement';
import Login from './pages/login/Login';
import HomePage from './pages/home/HomePage'
import CourseManagement from './pages/class-management/classManagement';
import ClassDetails from './pages/class-details/class-details';
import SchoolConcepts from './pages/school-concepts/school-concepts';


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

        {/* Rota para a UserProfile */}
        <Route path="/user-profile" element={<UserProfile />} />
        {/* Rota para a ClassManagement. */}
        <Route path="/class" element={<ClassManagement />} />
        {/* Rota para a ModalClass */}
        <Route path="/modal-class" element={<ModalClass />} />
        <Route path="/course-management" element={<CourseManagement />} />
        <Route path="/class-details" element={<ClassDetails />} />
        <Route path="/school-concepts" element={<SchoolConcepts />} />
        
      </Routes>
    </Router>
  );
}

export default App;

