import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import classApi from '../../api';
import Navbar from '../../components/navBar';
import html2pdf from 'html2pdf.js';
import CreateClassModal from '../../components/CreateClassModal';
import EditClassModal from '../../components/EditClassModal';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ClassManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [classes, setClasses] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    // Função para abrir o modal de edição
    const handleClickOpenEdit = (cls) => {
        setSelectedClass(cls); // Define a turma que será editada
        setOpenEdit(true);
    };

    // Função para abrir o modal de criação
    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    // Função para fechar o modal de edição
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectedClass(null); // Reseta a turma selecionada
    };

    // Função para fechar o modal de criação
    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    // Função para salvar alterações de uma turma
    const handleSave = async (updatedClass) => {
        try {
            if (selectedClass) {
                await classApi.put(`/mediotec/turmas/update/${selectedClass.classId}`, updatedClass);
                setClasses(classes.map(cls =>
                    cls.classId === selectedClass.classId ? { ...cls, ...updatedClass } : cls
                ));
            }
            handleCloseEdit(); // Fecha o modal após salvar
        } catch (error) {
            console.error('Erro ao atualizar turma:', error);
        }
    };

    // Função para criar uma nova turma
    const handleCreate = async (newClass) => {
        try {
            const { data } = await classApi.post('/mediotec/turmas/', newClass);
            setClasses([...classes, data]);  // Adiciona a nova turma à lista
            handleCloseCreate();  // Fecha o modal de criação
        } catch (error) {
            console.error('Erro ao criar nova turma:', error);
        }
    };

    // Função para excluir uma turma
    const handleDelete = async (classId) => {
        const confirmed = window.confirm("Tem certeza que deseja excluir esta turma?");
        if (!confirmed) return;

        try {
            await classApi.delete(`/mediotec/turmas/delete/${classId}`);
            setClasses(classes.filter(cls => cls.classId !== classId));  // Atualiza a lista removendo a turma deletada
        } catch (error) {
            console.error('Erro ao excluir turma:', error);
        }
    };

    // Carrega as turmas ao montar o componente
    useEffect(() => {
        const fetchClasses = async () => {
            const { data } = await classApi.get('/mediotec/turmas/');
            setClasses(data);
        };
        fetchClasses();
    }, []);

    // Filtra as turmas de acordo com o termo de pesquisa e ano selecionado
    const filteredClasses = classes.filter(cls =>
        cls.className.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType ? cls.year === Number(selectedType) : true)
    );

    // Função para exportar as turmas em PDF
    const handleExportPdf = () => {
        const element = document.getElementById('class-list');
        html2pdf().from(element).save('turmas.pdf');
    };

    return (
        <div>
            <Navbar />

            <Container className='container'>
                <h1 className="mt-4">Gerenciamento de Turmas</h1>
                <Form className="mb-4">
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Procurar"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                >
                                    <option value="">Filtro</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Button variant="primary" className="mt-2" onClick={handleClickOpenCreate}>Adicionar</Button>
                        </Col>
                    </Row>
                </Form>

                <Button variant="success" className="mb-4" onClick={handleExportPdf}>Exportar Turmas em PDF</Button>
                <Link to={'/class-details'}>
                    <Button>Adicionar Alunos à turma</Button>
                </Link>
                <Row id="class-list">
                    {filteredClasses.map(cls => (
                        <Col md={4} key={cls.classId} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <div className='d-flex justify-content-between back-roxo'>
                                        <Card.Title className='text-white text-uppercase'>{cls.className}</Card.Title>
                                        <Link to={'/class-details'}>
                                            <Button><i class="bi bi-plus-lg">  Add Alunos</i></Button>
                                        </Link>

                                    </div>
                                    <Card.Text>{cls.year}</Card.Text>
                                    <div className="mt-3 d-flex justify-content-between">
                                        <IconButton onClick={() => handleClickOpenEdit(cls)}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(cls.classId)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Modal de Criação */}
                <Dialog open={openCreate} onClose={handleCloseCreate}>
                    <DialogContent>
                        <CreateClassModal handleClose={handleCloseCreate} handleCreate={handleCreate} />
                    </DialogContent>
                </Dialog>

                {/* Modal de Edição */}
                <Dialog open={openEdit} onClose={handleCloseEdit}>
                    <DialogContent>
                        <EditClassModal classData={selectedClass} handleClose={handleCloseEdit} handleSave={handleSave} />
                    </DialogContent>
                </Dialog>
            </Container>
        </div>
    );
};

export default ClassManagement;
