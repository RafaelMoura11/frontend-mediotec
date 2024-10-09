import React, { useState } from 'react';
import { Button, Form, Table, Container, Row, Col } from 'react-bootstrap';
import "./class-details.css";

import Navbar from '../../components/navBar';

// Componente para a lista de disciplinas
const Disciplinas = ({ disciplinas }) => (
  <div className="mb-4">
    <h5 className='classh5'>Disciplinas</h5>
    <Table className='tabela-disciplinas' bordered hover>
      <tbody>
        {disciplinas.map((discipline, index) => (
          <tr key={index}>
            <td>{discipline.name} | {discipline.class}</td>
            <td className="tabela-horario">{discipline.hours}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

// Componente para a lista de alunos
const Students = ({ students, onAdd, onDelete, onToggleSelect, selectedStudents, onSelectAll, allSelected }) => {
  const [newStudent, setNewStudent] = useState('');

  const handleAdd = () => {
    if (newStudent.trim() !== '') {
      onAdd(newStudent);
      setNewStudent('');
    }
  };

  return (
    <div>
      <h5 className='classh5'>Alunos</h5>
      <div className='procurar-mb-3'>
        <Form className="mb-3">
          <Row>
            <Col sm={8}>
              {/* Dropdown para selecionar novos alunos */}
              <Form.Select
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
              >
                <option value="">Selecionar aluno</option>
                <option value="Carlos">Carlos</option>
                <option value="Maria">Maria</option>
                <option value="Fernanda">Fernanda</option>
                <option value="Jorge">Jorge</option>
              </Form.Select>
            </Col>
            <Col sm={4}>
              <Button className='botao-adicionar' variant="success" onClick={handleAdd}>
                Adicionar
              </Button>
            </Col>
            </Row>
            
        </Form>
        </div>
      
      <Form className="procurar-mb-3">
        <Form.Control className="procurar-barra" type="text" placeholder="Procurar" />
        <Button className='botao-excluir' variant="danger" onClick={onDelete}>
          Excluir
        </Button>
      </Form>

      <Table className="tabela" bordered hover style={{ width: '80%', margin: '0 auto' }}>
        <thead>
          <tr>
            <th className="checkbox">
              <Form.Check
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
              />
            </th>
            <th className="tabela_topo">Nome do Aluno</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedStudents.includes(student)}
                  onChange={() => onToggleSelect(student)}
                />
              </td>
              <td>{student}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// Componente principal da tela da turma
const ClassDetails = () => {
  const [disciplinas] = useState([
    { name: 'Português', class: 'Turma 1A24', hours: 'Carga Horária: 80h' },
    { name: 'Matemática', class: 'Turma 1A24', hours: 'Carga Horária: 80h' },
  ]);

  const [students, setStudents] = useState(['Cristina', 'João', 'Ana', 'Paulo']);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const handleAddStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const handleDeleteStudents = () => {
    setStudents(students.filter((student) => !selectedStudents.includes(student)));
    setSelectedStudents([]);
    setAllSelected(false); // Reseta o estado de "Selecionar todos"
  };

  const handleToggleSelect = (student) => {
    if (selectedStudents.includes(student)) {
      setSelectedStudents(selectedStudents.filter((s) => s !== student));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents([...students]);
    }
    setAllSelected(!allSelected);
  };

  return (
    <main className="main">
      <Navbar />
      <Container fluid>
        <h2 className='.class-title'>
          Turma 1º A - 2024
        </h2>
        <Disciplinas disciplinas={disciplinas} />
        <Students
          students={students}
          onAdd={handleAddStudent}
          onDelete={handleDeleteStudents}
          onToggleSelect={handleToggleSelect}
          selectedStudents={selectedStudents}
          onSelectAll={handleSelectAll}
          allSelected={allSelected}
        />
        <div className="mt-4">
          <Button className="botao-voltar" variant="primary">Voltar</Button>
        </div>
      </Container>
    </main>
  );
};

export default ClassDetails;
