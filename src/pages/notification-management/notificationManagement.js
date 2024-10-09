import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap'; // Mantendo os componentes essenciais do modal
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import notificationApi from '../../api';
import html2pdf from 'html2pdf.js'; // Importando a biblioteca html2pdf.js

const NotificationPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedComunicado, setSelectedComunicado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false); // Estado para abrir o modal de adição
  const [editedComunicado, setEditedComunicado] = useState({ title: '', content: '' });
  const [newComunicado, setNewComunicado] = useState({ title: '', content: '' }); // Estado para novo comunicado

  const pdfRef = useRef(); // Referência para a seção a ser exportada como PDF

  // Função para buscar os comunicados
  const fetchComunicados = async () => {
    try {
      const { data } = await notificationApi.get('/mediotec/notificacoes/');
      setDataSource(data);
    } catch (error) {
      console.error('Erro ao buscar comunicados:', error);
    }
  };

  useEffect(() => {
    fetchComunicados(); // Chama o fetch ao montar o componente
  }, []);

  // Função para abrir o modal de edição
  const handleClickOpenEdit = (comunicado) => {
    setSelectedComunicado(comunicado); // Define o comunicado a ser editado
    setEditedComunicado({ title: comunicado.title, content: comunicado.content }); // Popula o estado com os dados do comunicado
    setOpenEdit(true);
  };

  // Função para fechar o modal de edição
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditedComunicado({ title: '', content: '' }); // Limpa o estado
  };

  // Função para salvar alterações
  const handleSave = async () => {
    try {
      if (selectedComunicado && selectedComunicado.announcementId) {
        await notificationApi.put(`/mediotec/notificacoes/notification/${selectedComunicado.announcementId}`, {
          title: editedComunicado.title,
          content: editedComunicado.content,
        });

        // Atualiza apenas o comunicado editado
        const updatedDataSource = dataSource.map(comunicado =>
          comunicado.announcementId === selectedComunicado.announcementId
            ? { ...comunicado, title: editedComunicado.title, content: editedComunicado.content }
            : comunicado
        );

        setDataSource(updatedDataSource); // Atualiza o estado com a nova lista
      }
      handleCloseEdit(); // Fecha o modal após salvar
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  // Função para deletar comunicado
  const handleDelete = async (comunicadoId) => {
    try {
      await notificationApi.delete(`/mediotec/notificacoes/notification/${comunicadoId}`);
      
      // Filtra os comunicados, removendo o comunicado deletado
      const updatedDataSource = dataSource.filter(
        (comunicado) => comunicado.announcementId !== comunicadoId
      );
      
      setDataSource(updatedDataSource); // Atualiza o estado com a nova lista
    } catch (error) {
      console.error('Erro ao deletar o comunicado:', error);
    }
  };

  // Função para exibir o modal com o comunicado selecionado
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
    setNewComunicado({ title: '', content: '' }); // Limpa o estado do novo comunicado
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

      // Adiciona o novo comunicado ao estado
      setDataSource([...dataSource, response.data]);
      handleCloseAdd(); // Fecha o modal após adicionar
    } catch (error) {
      console.error('Erro ao adicionar o comunicado:', error);
    }
  };

  // Função para exportar os comunicados como PDF
  const handleExportPDF = () => {
    const element = pdfRef.current; // Captura o elemento que será exportado
    html2pdf()
      .from(element)
      .save('comunicados.pdf'); // Nome do arquivo PDF gerado
  };

  return (
    <div>
      <h1>Página de Notificações</h1>

      {/* Botão para exportar PDF */}
      <Button variant="success" onClick={handleExportPDF}>
        Exportar PDF
      </Button>

      {/* Botão para adicionar novo comunicado */}
      <Button variant="primary" onClick={handleOpenAdd} startIcon={<AddIcon />}>
        Adicionar Comunicado
      </Button>

      {/* Seção de Comunicados */}
      <div className='col-lg-4' ref={pdfRef}> {/* Referência para a seção a ser exportada */}
        <div className='background-roxo-quadrado d-flex align-items-center justify-content-center'>
          <h3 className='text-white text-center'>Comunicados</h3>
        </div>
        <div className='bg-light comunicados'>
          {dataSource.length > 0 ? (
            dataSource.map((comunicado, index) => (
              <div className='back-branco mt-3' key={index}>
                {/* Título clicável para abrir o modal */}
                <p className='back-roxo text-white text-center p-2' onClick={() => handleShowModal(comunicado)} style={{ cursor: 'pointer' }}>
                  {comunicado.title}
                </p>
                <p className='text-justify'>{comunicado.content}</p>
                <div className="mt-3 d-flex justify-content-between">
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
          <div className='d-flex justify-content-end'>
            <Button className='btn-roxo'>Ver mais</Button>
          </div>
        </div>
      </div>

      {/* Modal de Visualização */}
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
          <Modal.Title>Editar Comunicado</Modal.Title>
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
          <Modal.Title>Adicionar Comunicado</Modal.Title>
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
    </div>
  );
};

export default NotificationPage;
