import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const NotificationModal = ({ show, handleClose, title, comunicado, setComunicado, handleSave, isEditing }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Editar Comunicado' : 'Adicionar Comunicado'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={comunicado.title}
              onChange={(e) => setComunicado({ ...comunicado, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Conteúdo</label>
            <textarea
              className="form-control"
              id="content"
              value={comunicado.content}
              onChange={(e) => setComunicado({ ...comunicado, content: e.target.value })}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {isEditing ? 'Salvar Alterações' : 'Adicionar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;
