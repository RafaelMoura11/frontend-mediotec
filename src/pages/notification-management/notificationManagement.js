import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Navbar from '../../components/navBar';
import notificationApi from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import html2pdf from 'html2pdf.js'; // Para exportar PDF

const NotificationPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedComunicado, setSelectedComunicado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false); // Modal de adição
  const [editedComunicado, setEditedComunicado] = useState({ title: '', content: '' });
  const [newComunicado, setNewComunicado] = useState({ title: '', content: '' });
  const pdfRef = useRef(); // Para exportar como PDF

  // Função para buscar os comunicados
  const fetchComunicados = async () => {
    try {
      const { data } = await notificationApi.get('/mediotec/notificacoes/');
      setDataSource(data);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    }
  };

  useEffect(() => {
    fetchComunicados();
  }, []);

  // Função para abrir o modal de edição
  const handleClickOpenEdit = (comunicado) => {
    setSelectedComunicado(comunicado);
    setEditedComunicado({ title: comunicado.title, content: comunicado.content });
    setOpenEdit(true);
  };

  // Função para fechar o modal de edição
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditedComunicado({ title: '', content: '' });
  };

  // Função para salvar as alterações
  const handleSave = async () => {
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
      handleCloseEdit();
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  // Função para deletar um comunicado
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

  // Função para abrir o modal de visualização "Ler Mais"
  const handleShowModal = (comunicado) => {
    setSelectedComunicado(comunicado);
    setShowModal(true);
  };

  // Função para fechar o modal de visualização
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComunicado(null);
  };

  // Função para abrir o modal de adição
  const handleOpenAdd = () => {
    setNewComunicado({ title: '', content: '' }); // Limpa o estado
    setOpenAdd(true);
  };

  // Função para fechar o modal de adição
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  // Função para adicionar um novo comunicado
  const handleAdd = async () => {
    try {
      const response = await notificationApi.post('/mediotec/notificacoes/', {
        title: newComunicado.title,
        content: newComunicado.content,
      });

      setDataSource([...dataSource, response.data]); // Atualiza a lista com o novo comunicado
      handleCloseAdd();
    } catch (error) {
      console.error('Erro ao adicionar o comunicado:', error);
    }
  };

  // Função para exportar os comunicados como PDF
  const handleExportPDF = () => {
    const element = pdfRef.current;
    html2pdf().from(element).save('comunicados.pdf');
  };

  return (
    <main>
      <Navbar />
      <div className="notification-management-container">
        <h1 className="notification-management-title">Gerenciamento de Comunicações</h1>

        {/* Botão para exportar PDF e adicionar nova notificação */}
        <div className="d-flex justify-content-end mb-4">
          <Button variant="secondary" className="me-2" onClick={handleExportPDF}>
            Exportar PDF
          </Button>
          <Button variant="success" onClick={handleOpenAdd} startIcon={<AddIcon />}>
            Adicionar Notificação
          </Button>
        </div>

        <div ref={pdfRef}>
          <div className="notification-management-list">
            {dataSource.length > 0 ? (
              dataSource.map((comunicado) => (
                <div key={comunicado.announcementId} className="notification-item">
                  {/* Título do comunicado */}
                  <h3 className="text-uppercase">{comunicado.title}</h3>

                  {/* Conteúdo e Botões */}
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-between mb-2">
                      <div>
                        {/* Botões de editar e deletar */}
                        <IconButton onClick={() => handleClickOpenEdit(comunicado)} className="me-2">
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(comunicado.announcementId)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </div>
                    </div>
                    {/* Botão de "Ler Mais" ocupando a largura total */}
                    <button
                      className='btn text-white text-uppercase'
                      style={{ backgroundColor: '#7326BF' }}
                      onClick={() => handleShowModal(comunicado)}
                    >
                      Ler mais
                    </button>                  </div>
                </div>
              ))
            ) : (
              <p>Não há notificações disponíveis.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal de visualização "Ler Mais" */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedComunicado?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedComunicado?.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Edição */}
      <Modal show={openEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Notificação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={editedComunicado.title}
                onChange={(e) => setEditedComunicado({ ...editedComunicado, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Conteúdo</label>
              <textarea
                className="form-control"
                id="content"
                value={editedComunicado.content}
                onChange={(e) => setEditedComunicado({ ...editedComunicado, content: e.target.value })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Adição */}
      <Modal show={openAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Notificação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="newTitle">Título</label>
              <input
                type="text"
                className="form-control"
                id="newTitle"
                value={newComunicado.title}
                onChange={(e) => setNewComunicado({ ...newComunicado, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newContent">Conteúdo</label>
              <textarea
                className="form-control"
                id="newContent"
                value={newComunicado.content}
                onChange={(e) => setNewComunicado({ ...newComunicado, content: e.target.value })}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdd}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default NotificationPage;