// Components/EditClassModal.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const EditClassModal = ({ classData, handleClose, handleSave }) => {
    const [className, setClassName] = useState('');
    const [year, setYear] = useState('');

    // Preencher o formulário com os dados da turma ao abrir o modal
    useEffect(() => {
        if (classData) {
            setClassName(classData.className);
            setYear(classData.year);
        }
    }, [classData]);

    const handleSubmit = () => {
        const updatedClass = {
            className,
            year: Number(year),
        };
        handleSave(updatedClass);  // Chamar a função de salvar passada via props
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
                <Button variant="primary" onClick={handleSubmit}>Salvar</Button>
                <Button variant="secondary" className="ms-2" onClick={handleClose}>Cancelar</Button>
            </div>
        </Form>
    );
};

export default EditClassModal;
