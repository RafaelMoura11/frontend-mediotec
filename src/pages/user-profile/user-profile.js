import React from 'react';
import './user-profile.css'; // Adjust the path as needed for your CSS

function UserProfile() {
    return ( // Use 'return' to output the JSX
        <div className="container">
            <div className="header">
                <h2 className='text-white'>Joao Pedro</h2>
                <button className="back-button">Voltar</button>
            </div>
            <div className="profile-info">
                <div className="profile-pic">
                    <div className="icon"></div>
                    <p><strong>Nome:</strong> Joao Pedro</p>
                    <p><strong>Cargo:</strong> Aluno</p>
                </div>
                <div className="personal-info">
                    <p><strong>Sexo:</strong> Masculino</p>
                    <p><strong>Cpf:</strong> 123 456 780 - 12</p>
                    <p><strong>Data Nascimento:</strong> 10/08/1990</p>
                    <p><strong>Email:</strong> joaoAluno@senac.com</p>
                    <p><strong>Telefone:</strong> 81 98765-5432</p>
                    <p><strong>Matrícula:</strong> 123476</p>
                    <p><strong>Responsável:</strong> 123476</p>
                    <p><strong>Contato do Responsável:</strong> 123476</p>
                </div>
            </div>
            <div className="disciplinas">
                <h3>Turma</h3>
                <p>Turma</p>
            </div>
        </div>
    );
}

export default UserProfile;
