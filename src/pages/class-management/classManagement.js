import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Nav } from 'react-bootstrap';
import { Dialog, DialogContent, DialogActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import "./classManagement.css";
import classApi from '../../api';
import ClassesModal from '../../components/ClassesModal';


const ClassManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [classes, setClasses] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    // Abre o modal para adicionar ou editar uma turma
    const handleClickOpen = (cls) => {
        setSelectedClass(cls);  // Define a turma que será editada
        setOpen(true);
    };

    // Fecha o modal
    const handleClose = () => {
        setOpen(false);
        setSelectedClass(null);  // Reseta a turma selecionada
    };

    // Função para excluir a turma
    const handleDelete = async (classId) => {
        const confirmed = window.confirm("Tem certeza que deseja excluir esta turma?");
        if (!confirmed) return;

        try {
            // Faz a requisição DELETE para a API
            await classApi.delete(`/mediotec/turmas/${classId}`);

            // Atualiza a lista de turmas removendo a turma deletada
            setClasses(classes.filter(cls => cls.classId !== classId));

            // Feedback para o usuário
            alert('Turma excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir turma:', error);
            alert('Erro ao excluir turma. Tente novamente.');
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

    return (
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
                        <Button variant="primary" className="mt-2" onClick={() => handleClickOpen(null)}>Adicionar</Button>
                    </Col>
                </Row>
            </Form>

            <Row>
                {filteredClasses.map(cls => (
                    <Col md={4} key={cls.classId} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{cls.className}</Card.Title>
                                <Card.Text>{cls.year}</Card.Text>
                                <Nav variant="tabs">
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="#">Alunos</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="#">Professores</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <div className="mt-3 d-flex justify-content-between">
                                    <IconButton onClick={() => handleClickOpen(cls)}>
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

            {/* Modal para Adicionar/Editar Turmas */}
            <Dialog open={open} fullWidth onClose={handleClose}>
                <DialogContent>
                    <ClassesModal classData={selectedClass} handleClose={handleClose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ClassManagement;
