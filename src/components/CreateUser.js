import React, { useState } from 'react';

export default function CreateUser({ handleClose }) {
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
            handleClose();
        } catch (error) {
            console.error(formData);
        }
    };

    const cancelHandle = () => {
        handleClose();
    }

    return (
        <div className="container">
            <h1 class="title">Novo Usuário</h1>
            <form className="form-user" type='file' onSubmit={handleSubmit}>
                <div className="profile-picture">
                    <img src="data:image/png;base64,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" alt="Foto do perfil" />
                    <div className="edit-icon">&#9998;</div>
                    <div className="input-item">
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" placeholder="Nome completo" value={formData.name} onChange={handleChange} />
                    </div>
                </div>
                
                <div className="input-group">
                    <div className="input-item">
                        <label htmlFor="role">Tipo</label>
                        <select id="role" value={formData.role} onChange={handleChange}>
                            <option value="" disabled>Selecione o tipo de usuário</option>
                            <option value="STUDENT">Aluno</option>
                            <option value="TEACHER">Professor</option>
                            <option value="COORDINATOR">Coordenador</option>
                        </select>
                    </div>
                    <div className="input-item">
                        <label htmlFor="cpf">CPF</label>
                        <input type="text" id="cpf" placeholder="xxx.xxx.xxx-xx" value={formData.cpf} onChange={handleChange} />
                    </div>
                </div>

                <div className="input-group">
                    <div className="input-item">
                        <label htmlFor="dateOfBirth">Data de Nascimento</label>
                        <input type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                    <div className="input-item">
                        <label htmlFor="gender">Gênero</label>
                        <select id="gender" value={formData.gender} onChange={handleChange}>
                            <option value="" disabled>Selecione o gênero</option>
                            <option value="MALE">Masculino</option>
                            <option value="FEMALE">Feminino</option>
                            <option value="NOT_SPECIFIED">Outro</option>
                        </select>
                    </div>
                </div>

                <div className="input-group">
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
                    <button type="button" className="btn-cancelar" onClick={cancelHandle}>Cancelar</button>
                    <button type="submit" className="btn-salvar">Salvar</button>
                </div>
            </form>
        </div>
    );
}
