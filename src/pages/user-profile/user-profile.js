import React, { useState, useEffect } from 'react';


function UserProfile() {
    const [user, setUser] = useState(null);
   

return (
    <main>
        <h1 className='perfil-name'>Nome</h1>

        <div className="info-row">
            <p>Nome: {user?.name}</p>
            <p>CPF: {user?.cpf}</p>
            <p>Data de Nascimento: {user?.dateOfBirth}</p>
            <p>Gênero: {user?.gender}</p>
            <p>E-mail: {user?.email}</p>
            <p>Telefone: {user?.phone}</p>
            <p>Contato com Família: {user?.familyContact}</p>
            <p>Matrícula: {user?.registration}</p>
            <p>Formação Acadêmica: {user?.education}</p>
        </div>


{/*  objetivo ver a questão da teoria de gerenciamento da comunicação da gestão de projetos */}

    </main>
);
}

export default UserProfile;