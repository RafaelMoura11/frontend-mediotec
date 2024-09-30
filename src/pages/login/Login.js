// src/components/Login.js
import React, { useState } from 'react';

import loginImage from '../../images/imageLogin.jpg';
import '../login/login-style.css'

function Login() {

    const [userType, setUserType] = useState('Coordenador');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login info:', { userType, email, password });
        // Adicionar lógica de autenticação
      };


  return (
    <div className="login-page">

        <div className="login-image">
            <img src={loginImage} alt="Login visual" />
        </div>


        <div className="login-form">

            <h2 className='login-title'>Login</h2>

            <form onSubmit={handleLogin}>
            <div className="input-group">
                <label htmlFor="userType">Tipo de usuário</label>
                <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                >
                <option value="Coordenador">Coordenador</option>
                <option value="Professor">Professor</option>
                <option value="Aluno">Aluno</option>
                </select>
            </div>

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="coordenador@pe.edu.senac.br"
                required
                />
            </div>

            <div className="input-group">
                <label htmlFor="password">Senha</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                />
            </div>

            <button type="submit" className="login-button">Entrar</button>
            </form>
        </div>
    </div>
  );
};

export default Login;
