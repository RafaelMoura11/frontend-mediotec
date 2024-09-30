import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../navbar/navBar-style.css';
import logo from '../../images/logo-mediotec.png';

function Navbar() {
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Mediotec" width="30" height="24"/>
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/features">Disciplinas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pricing">Turmas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user-management">Usuários</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pricing">Comunicados</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
