// Components/CreateClassModal.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateClassModal = ({ handleClose, handleCreate }) => {
    const [className, setClassName] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = () => {
        const newClass = {
            className,
            year: Number(year),
        };
        handleCreate(newClass);  // Chamar a função de criação passada via props
    };

    return (
        <Form>
            <Form.Group controlId="formClassName">
                <Form.Label>Nome da Turma</Form.Label>
                <Form.Control
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formYear" className="mt-3">
                <Form.Label>Ano</Form.Label>
                <Form.Control
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </Form.Group>
            <div className="mt-4">
                <Button variant="primary" onClick={handleSubmit}>Criar</Button>
                <Button variant="secondary" className="ms-2" onClick={handleClose}>Cancelar</Button>
            </div>
        </Form>
    );
};

export default CreateClassModal;
