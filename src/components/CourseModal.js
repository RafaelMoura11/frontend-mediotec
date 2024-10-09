import React from 'react';

function CourseModal({
  showModal,
  isEditing,
  newCourse,
  setNewCourse,
  handleCloseModal,
  handleAddCourse,
  handleEditCourse,
}) {
  if (!showModal) return null; // Se o modal não estiver aberto, retorna null

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditing ? 'Editar Disciplina' : 'Adicionar Disciplina'}</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>

          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nome da disciplina"
              value={newCourse.courseName}
              onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Carga Horária"
              value={newCourse.workload}
              onChange={(e) => setNewCourse({ ...newCourse, workload: parseInt(e.target.value) })}
            />
            <textarea
              className="form-control"
              placeholder="Ementa"
              rows="6"
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleCloseModal}>Fechar</button>
            <button className="btn btn-primary" onClick={isEditing ? handleEditCourse : handleAddCourse}>
              {isEditing ? 'Salvar Alterações' : 'Adicionar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseModal;
