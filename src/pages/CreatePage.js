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
        // Implementação da requisição...
    };

    return (
        <div className="container">
            <form className="form-user" onSubmit={handleSubmit}>
                <h1>Novo Usuário</h1>
                <div className="profile-picture">
                    <img src="https://via.placeholder.com/100" alt="Foto do perfil" />
                    <div className="edit-icon">&#9998;</div>
                </div>
                
                <div className="input-group">
                    <div className="input-item">
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" placeholder="Nome completo" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="input-item">
                        <label htmlFor="role">Tipo</label>
                        <select id="role" value={formData.role} onChange={handleChange}>
                            <option value="" disabled>Selecione o tipo de usuário</option>
                            <option value="STUDENT">Aluno</option>
                            <option value="TEACHER">Professor</option>
                            <option value="COORDINATOR">Coordenador</option>
                        </select>
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-item">
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" id="cpf" placeholder="xxx.xxx.xxx-xx" value={formData.cpf} onChange={handleChange} />
                    </div>
                    <div className="input-item">
                        <label htmlFor="dateOfBirth">Data de Nascimento</label>
                        <input type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-item">
                        <label htmlFor="gender">Gênero</label>
                        <select id="gender" value={formData.gender} onChange={handleChange}>
                            <option value="" disabled>Selecione o gênero</option>
                            <option value="MALE">Masculino</option>
                            <option value="FEMALE">Feminino</option>
                            <option value="NOT_SPECIFIED">Outro</option>
                        </select>
                    </div>
                    <div className="input-item">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="user.new@email.com" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="input-item">
                        <label htmlFor="phone">Telefone</label>
                        <input type="tel" id="phone" placeholder="(xx) xxxxx-xxxx" value={formData.phone} onChange={handleChange} />
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-item">
                        <label htmlFor="familyContact">Contato do responsável</label>
                        <input type="tel" id="familyContact" placeholder="(xx) xxxxx-xxxx" value={formData.familyContact} onChange={handleChange} />
                    </div>
                    <div className="input-item">
                        <label htmlFor="affiliation">Responsável</label>
                        <input type="text" id="affiliation" placeholder="Nome completo do responsável" value={formData.affiliation} onChange={handleChange} />
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-item">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" placeholder="*********" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="input-item">
                        <label htmlFor="confirmPassword">Confirmar senha</label>
                        <input type="password" id="confirmPassword" placeholder="*********" value={formData.confirmPassword} onChange={handleChange} />
                    </div>
                </div>

                <div className="buttons">
                    <button type="button" className="btn-cancelar">Cancelar</button>
                    <button type="submit" className="btn-salvar">Salvar</button>
                </div>
            </form>
        </div>
    );
}
