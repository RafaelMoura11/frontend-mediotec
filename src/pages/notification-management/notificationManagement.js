import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'; // Usando componentes do Bootstrap
import { IconButton } from '@mui/material'; // IconButton do Material UI
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import notificationApi from '../../api';
import html2pdf from 'html2pdf.js';

import Navbar from '../../components/navBar';
import NotificationModal from '../../components/NotificationModal'; // Modal para editar/adicionar comunicado

const NotificationPage = () => {
  const [dataSource, setDataSource] = useState([]); // Dados dos comunicados
  const [filteredComunicados, setFilteredComunicados] = useState([]); // Comunicados filtrados
  const [selectedComunicado, setSelectedComunicado] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false); // Modal de adição
  const [editedComunicado, setEditedComunicado] = useState({ title: '', content: '' });
  const [newComunicado, setNewComunicado] = useState({ title: '', content: '' }); // Estado para novo comunicado
  const [searchTerm, setSearchTerm] = useState(''); // Campo de busca
  const pdfRef = useRef(); // Referência para exportar o PDF

  // Função para buscar os comunicados
  const fetchComunicados = async () => {
    try {
      const { data } = await notificationApi.get('/mediotec/notificacoes/');
      setDataSource(data);
      setFilteredComunicados(data); // Inicialmente, todos os comunicados são mostrados
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    }
  };

  useEffect(() => {
    fetchComunicados();
  }, []);

  // Função para filtrar comunicados
  useEffect(() => {
    const filtered = dataSource.filter(comunicado =>
      comunicado.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comunicado.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComunicados(filtered); // Atualiza a lista de comunicados filtrados
  }, [searchTerm, dataSource]);

  // Função para abrir o modal de edição
  const handleClickOpenEdit = (comunicado) => {
    setSelectedComunicado(comunicado);
    setEditedComunicado({ title: comunicado.title, content: comunicado.content });
    setOpenEdit(true);
  };

  // Função para salvar alterações no comunicado
  const handleSaveEdit = async () => {
    try {
      if (selectedComunicado && selectedComunicado.announcementId) {
        await notificationApi.put(`/mediotec/notificacoes/notification/${selectedComunicado.announcementId}`, {
          title: editedComunicado.title,
          content: editedComunicado.content,
        });

        const updatedDataSource = dataSource.map(comunicado =>
          comunicado.announcementId === selectedComunicado.announcementId
            ? { ...comunicado, title: editedComunicado.title, content: editedComunicado.content }
            : comunicado
        );

        setDataSource(updatedDataSource);
      }
      setOpenEdit(false); // Fecha o modal após salvar
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  // Função para abrir o modal de visualização ao clicar no card
  const handleShowNotification = (comunicado) => {
    setSelectedComunicado(comunicado); // Define o comunicado selecionado
    setOpenEdit(true); // Abre o modal de edição como visualização
  };

  // Função para adicionar um novo comunicado
  const handleAdd = async () => {
    try {
      const response = await notificationApi.post('/mediotec/notificacoes/', {
        title: newComunicado.title,
        content: newComunicado.content,
      });

      // Adiciona o novo comunicado ao estado
      setDataSource([...dataSource, response.data]);
      setOpenAdd(false); // Fecha o modal após adicionar
    } catch (error) {
      console.error('Erro ao adicionar o comunicado:', error);
    }
  };

  // Função para deletar comunicado
  const handleDelete = async (comunicadoId) => {
    try {
      await notificationApi.delete(`/mediotec/notificacoes/notification/${comunicadoId}`);
      const updatedDataSource = dataSource.filter(
        (comunicado) => comunicado.announcementId !== comunicadoId
      );
      setDataSource(updatedDataSource);
    } catch (error) {
      console.error('Erro ao deletar o comunicado:', error);
    }
  };

  // Função para exportar PDF dos comunicados
  const handleExportPDF = () => {
    const element = pdfRef.current;
    html2pdf()
      .from(element)
      .save('comunicados.pdf');
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="titulo">Comunicados</h1>

        {/* Campo de busca e botão adicionar */}
        <Form className="mb-4">
          <Row>
            <Col md={10}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Procurar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button
                variant="success"
                onClick={() => setOpenAdd(true)}
              >
                <AddIcon /> Adicionar
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Seção de Comunicados */}
        <div className="comunicados-list" ref={pdfRef}>
          {filteredComunicados.length > 0 ? (
            filteredComunicados.map((comunicado, index) => (
              <div className="comunicado-item" key={index}>
                <div className="comunicado-content" onClick={() => handleShowNotification(comunicado)}>
                  <strong className="comunicado-title">{comunicado.title}</strong>
                  <p className="comunicado-description">{comunicado.content}</p>
                </div>
                <div className="comunicado-actions">
                  <IconButton onClick={() => handleClickOpenEdit(comunicado)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(comunicado.announcementId)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              </div>
            ))
          ) : (
            <p>Não há comunicados disponíveis.</p>
          )}
        </div>

        {/* Modal de Edição */}
        <NotificationModal
          show={openEdit}
          handleClose={() => setOpenEdit(false)}
          comunicado={editedComunicado}
          setComunicado={setEditedComunicado}
          handleSave={handleSaveEdit}
          isEditing={true}
        />

        {/* Modal de Adição */}
        <NotificationModal
          show={openAdd}
          handleClose={() => setOpenAdd(false)}
          comunicado={newComunicado}
          setComunicado={setNewComunicado}
          handleSave={handleAdd}
          isEditing={false}
        />
      </div>
    </div>
  );
};

export default NotificationManagement;