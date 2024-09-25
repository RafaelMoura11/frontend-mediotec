import React, { useState } from 'react';

export default function CreatePage() {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        cpf: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        phone: '',
        familyContact: '',
        affiliation: '',
        password: '',
        confirmPassword: '',
        image: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formattedDate = new Date(formData.dateOfBirth).toISOString();
            const allFields = {...formData, dateOfBirth: formattedDate};
            const { confirmPassword, ...postBody } = allFields;
            const response = await fetch('https://api-mediotec.onrender.com/mediotec/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postBody),
            });

            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }

            const data = await response.json();
            console.log('Usuário criado com sucesso:', data);
            // Aqui você pode redirecionar ou limpar o formulário, se necessário
        } catch (error) {
            console.error(formData);
        }
    };

    return (
        <div className="container">
            <form className="form-user" onSubmit={handleSubmit}>
                <h1>Novo Usuário</h1>
                <div className="profile-picture">
                    <img src="https://via.placeholder.com/100" alt="Foto do perfil" />
                    <div className="edit-icon">&#9998;</div>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Nome completo"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Tipo</label>
                    <select
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Selecione o tipo de usuário</option>
                        <option value="STUDENT">Aluno</option>
                        <option value="TEACHER">Professor</option>
                        <option value="COORDINATOR">Coordenador</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        id="cpf"
                        placeholder="xxx.xxx.xxx-xx"
                        value={formData.cpf}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Data de Nascimento</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gênero</label>
                    <select
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Selecione o gênero</option>
                        <option value="MALE">Masculino</option>
                        <option value="FEMALE">Feminino</option>
                        <option value="NOT_SPECIFIED">Outro</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="user.new@email.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefone</label>
                    <input
                        type="tel"
                        id="phone"
                        placeholder="(xx) xxxxx-xxxx"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="familyContact">Contato do responsável</label>
                    <input
                        type="tel"
                        id="familyContact"
                        placeholder="(xx) xxxxx-xxxx"
                        value={formData.familyContact}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="affiliation">Responsável</label>
                    <input
                        type="text"
                        id="affiliation"
                        placeholder="Nome completo do responsável"
                        value={formData.affiliation}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="*********"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="*********"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="buttons">
                    <button type="button" className="btn-cancelar">Cancelar</button>
                    <button type="submit" className="btn-salvar">Salvar</button>
                </div>
            </form>
        </div>
    );
}
