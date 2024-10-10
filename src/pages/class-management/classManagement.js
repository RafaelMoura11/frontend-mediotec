import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Dialog, DialogContent } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import classApi from '../../api';
import Navbar from '../../components/navBar';
import html2pdf from 'html2pdf.js';
import CreateClassModal from '../../components/CreateClassModal';
import EditClassModal from '../../components/EditClassModal';
import ClassCard from '../../components/ClassCard';

const ClassManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [classes, setClasses] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const handleClickOpenEdit = (cls) => {
        setSelectedClass(cls);
        setOpenEdit(true);
    };

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectedClass(null);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleSave = async (updatedClass) => {
        try {
            if (selectedClass) {
                await classApi.put(`/mediotec/turmas/update/${selectedClass.classId}`, updatedClass);
                setClasses(classes.map(cls =>
                    cls.classId === selectedClass.classId ? { ...cls, ...updatedClass } : cls
                ));
            }
            handleCloseEdit();
        } catch (error) {
            console.error('Erro ao atualizar turma:', error);
        }
    };

    const handleCreate = async (newClass) => {
        try {
            const { data } = await classApi.post('/mediotec/turmas/', newClass);
            setClasses([...classes, data]);
            handleCloseCreate();
        } catch (error) {
            console.error('Erro ao criar nova turma:', error);
        }
    };

    const handleDelete = async (classId) => {
        const confirmed = window.confirm("Tem certeza que deseja excluir esta turma?");
        if (!confirmed) return;

        try {
            await classApi.delete(`/mediotec/turmas/delete/${classId}`);
            setClasses(classes.filter(cls => cls.classId !== classId));
        } catch (error) {
            console.error('Erro ao excluir turma:', error);
        }
    };

    const handleExportPdf = () => {
        const element = document.getElementById('exportTable');
        if (!element) {
            console.error('Elemento exportTable não encontrado.');
            return;
        }

        const opt = {
            margin: 0.5,
            filename: 'disciplinas.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    };

    useEffect(() => {
        const fetchClasses = async () => {
            const { data } = await classApi.get('/mediotec/turmas/');
            setClasses(data);
        };
        fetchClasses();
    }, []);

    const filteredClasses = classes.filter(cls =>
        cls.className.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType ? cls.year === Number(selectedType) : true)
    );

    return (
        <div>
            <Navbar />

            <Container className='mt-5' id='exportTable'>
                <h1 className="titulo">Gerenciamento de Turmas</h1>
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
                            <Button variant="primary" className="btn-success" onClick={handleClickOpenCreate}>Adicionar</Button>
                        </Col>
                    </Row>
                    <Button className="btn btn-roxo mt-4" onClick={handleExportPdf}>Relatório</Button>
                </Form>

                <Row id="class-list">
                    {filteredClasses.map(cls => (
                        <Col md={4} key={cls.classId}>
                            <ClassCard
                                className={cls.className}
                                year={cls.year}
                                onEdit={() => handleClickOpenEdit(cls)}
                                onDelete={() => handleDelete(cls.classId)}
                            />
                        </Col>
                    ))}
                </Row>

                <Dialog open={openCreate} onClose={handleCloseCreate}>
                    <DialogContent>
                        <CreateClassModal handleClose={handleCloseCreate} handleCreate={handleCreate} />
                    </DialogContent>
                </Dialog>

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
