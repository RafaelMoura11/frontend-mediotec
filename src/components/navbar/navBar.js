import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../navbar/navBar-style.css';
import logo from '../../images/logo-mediotec.png';

function Navbar() {
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="Mediotec" width="30" height="24" />
          </NavLink>

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
                <NavLink className="nav-link" exact to="/" activeClassName="active-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/course-management" activeClassName="active-link">
                  Disciplinas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/class" activeClassName="active-link">
                  Turmas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/user-management" activeClassName="active-link">
                  Usuários
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/notification-management" activeClassName="active-link">
                  Comunicados
                </NavLink>
               
              
              
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
