import React from 'react';
import './home-style.css';

import Navbar from '../../components/navbar/navBar';

function HomePage() {
  return (
    <div className="HomePage">

      <Navbar></Navbar>
      <h1>Bem-vindo à Página Principal!</h1>
    </div>
  );
}

export default HomePage;
