import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./classManagement.css"

const ClassManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const classes = [
        { id: 1, series: '1º Ano', room: '101', type: 'Integral' },
        { id: 2, series: '2º Ano', room: '102', type: 'Integral' },
        { id: 3, series: '3º Ano', room: '103', type: 'Integral' },
    ];

    const filteredClasses = classes.filter(cls =>
        cls.series.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType ? cls.type === selectedType : true)
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
                                <option value="">Filtro </option>
                                <option value="1º Ano">1º Ano</option>  
                                <option value="2º Ano">2º Ano</option>
                                <option value="3º Ano">3º Ano</option>
                                {/* Adicione mais opções aqui, se necessário */}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Button variant="primary" className="mt-2">Adicionar</Button>
                    </Col>
                </Row>
            </Form>

            <Row>
                {filteredClasses.map(cls => (
                    <Col md={4} key={cls.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{cls.series} - {cls.room}<br /></Card.Title>
                                <Card.Text>
                                   {cls.type}
                                </Card.Text>
                                <Nav variant="tabs">
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`/conteudo/${cls.id}`}>Conteúdo</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`/notas/${cls.id}`}>Notas</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ClassManagement;
