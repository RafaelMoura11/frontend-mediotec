import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalClass() {
  const [show, setShow] = useState(false);
  const [turma, setTurma] = useState({
    nome: '',
    serie: '',
    cargaHoraria: '',
    alunos: []
  });

  // Funções para abrir e fechar o modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Função para lidar com mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurma({ ...turma, [name]: value });
  };

  // Função para lidar com seleção múltipla de alunos
  const handleAlunosChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setTurma({ ...turma, alunos: selectedOptions });
  };

  // Função para salvar a turma
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para o backend ou outro processo de gerenciamento de estado
    console.log(turma);
    handleClose(); // Fechar o modal após salvar
  };

  return (
    <div className="container mt-5">
      <h1>Cadastro de Turma</h1>
      <Button variant="primary" onClick={handleShow}>
        Cadastrar Nova Turma
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header className="custom-modal-title" closeButton>
        <Modal.Title>Nova Turma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            {/* Div para Nome da Turma, Série e Carga Horária */}
            <div className="d-flex flex-row justify-content-between">
              <Form.Group controlId="formNome" className="flex-fill me-2">
                <Form.Label>Nome da Turma</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome da turma"
                  name="nome"
                  value={turma.nome}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formSerie" className="flex-fill me-2">
                <Form.Label>Série</Form.Label>
                <Form.Control as="select" name="serie" value={turma.serie} onChange={handleChange}>
                  <option value="">Selecione a série</option>
                  <option value="1ª Ano">1º Ano</option>
                  <option value="2ª Ano">2º Ano</option>
                  <option value="3ª Ano">3º Ano</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formCargaHoraria" className="flex-fill">
                <Form.Label>Carga Horária</Form.Label>
                <Form.Control as="select" name="cargaHoraria" value={turma.cargaHoraria} onChange={handleChange}>
                  <option value="">Selecione a carga horária</option>
                  <option value="3200h">3200h</option>
                  
                </Form.Control>
              </Form.Group>
            </div>

            <Form.Group controlId="formAlunos" className="mt-3">
              <Form.Label>Alunos</Form.Label>
              <Form.Control as="select" multiple name="alunos" value={turma.alunos} onChange={handleAlunosChange}>
                <option value="Aluno 1">Aluno 1</option>
                <option value="Aluno 2">Aluno 2</option>
                <option value="Aluno 3">Aluno 3</option>
                <option value="Aluno 4">Aluno 4</option>
              </Form.Control>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" className="custom-cancel-button me-2" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" className="custom-save-button">
                Salvar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalClass;
