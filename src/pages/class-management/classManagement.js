import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Nav } from 'react-bootstrap';
import { Dialog, DialogContent } from '@mui/material';
import { Link } from 'react-router-dom';

import api from '../../api';
import ClassesModal from '../../components/ClassesModal';
import Navbar from '../../components/navBar';

const ClassManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [classes, setClasses] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await api.get('/mediotec/turmas/');
            setClasses(data);
        }
        fetchUsers();
    }, [])

    const filteredClasses = classes.filter(cls =>
        cls.className.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType ? cls.year === Number(selectedType) : true)
    );

    return (
        <main>
            <Navbar></Navbar>
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
                                    <option value="">Filtro </option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    {/* Adicione mais opções aqui, se necessário */}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Button variant="primary" className="mt-2" onClick={handleClickOpen}>Adicionar</Button>
                        </Col>
                    </Row>
                </Form>

                <Row>
                    {filteredClasses.map(cls => (
                        <Col md={4} key={cls.classId} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{cls.className}<br /></Card.Title>
                                    <Card.Text>
                                        {cls.year}
                                    </Card.Text>
                                    <Nav variant="tabs">
                                        <Nav.Item>
                                            <Nav.Link as={Link} to="#">Alunos</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link as={Link} to="#">Professores</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Dialog open={open} fullWidth>
                    <DialogContent>
                        <ClassesModal handleClose={handleClose} />
                    </DialogContent>
                </Dialog>
            </Container>
        </main>
    );
};

export default ClassManagement;
