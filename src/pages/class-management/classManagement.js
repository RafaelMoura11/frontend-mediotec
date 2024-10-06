import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Nav } from 'react-bootstrap';
import { Dialog, DialogContent, DialogActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import api from '../../api';
import ClassesModal from '../../components/ClassesModal';

const ClassManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [classes, setClasses] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const handleClickOpen = (cls) => {
        setSelectedClass(cls);  // Set the class to be edited
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedClass(null);  // Reset after closing modal
    };

    const handleDelete = async (classId) => {
        try {
            await api.delete(`/mediotec/turmas/${classId}`);
            setClasses(classes.filter(cls => cls.classId !== classId)); // Update UI after deletion
        } catch (error) {
            console.error('Erro ao excluir turma:', error);
        }
    };

    useEffect(() => {
        const fetchClasses = async () => {
            const { data } = await api.get('/mediotec/turmas/');
            setClasses(data);
        };
        fetchClasses();
    }, []);

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

            {/* Modal for Adding/Editing Classes */}
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
