import React, { useEffect, useState } from 'react';
import usersApi from '../api';
import './createUser/createUser-style.css';

export default function ClassesModal({ handleClose, user }) {
    const [formData, setFormData] = useState({
        className: '',
        year: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({ ...user, confirmPassword: user.confirmPassword })
        }
    }, [user])

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
            const reqBody = {...formData, year: Number(formData.year)};
            if (user) {
                const response = await usersApi.put(`/mediotec/turmas/${user.userId}`, reqBody);
                console.log('Usuário criado com sucesso:', response.data);
            } else {
                const response = await usersApi.post('/mediotec/turmas/', reqBody)
                console.log('Usuário criado com sucesso:', response.data);
            }

            handleClose();
        } catch (error) {
            console.error(formData);
        }
    };

    const cancelHandle = () => {
        handleClose();
    }

    return (
        <div>
            <h1 class="title">Nova Classe</h1>
            <form className="form-user" type='file' onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="input-item">
                        <label htmlFor="className">Nome da classe:</label>
                        <input type="text" id="className" value={formData.className} onChange={handleChange} />
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-item">
                            <label htmlFor="year">Ano:</label>
                            <input type="number" id="year" value={formData.year} onChange={handleChange} />
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
