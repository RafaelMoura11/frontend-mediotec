import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom';
import courseApi from '../../api';

import Navbar from '../../components/navBar';

function CourseManagement() {
  const [dataSource, setDataSource] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('alphabetic');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    workload: '',
    description: '',
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const { data } = await courseApi.get('/mediotec/disciplinas/todos');
      setDataSource(data);
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const excluirDisciplina = async () => {
    try {
      for (const courseId of selectedRows) {
        await courseApi.delete(`/mediotec/disciplinas/coursedelete/${courseId}`);
      }
      fetchCourses();
      setSelectedRows([]);
    } catch (error) {
      console.error('Erro ao excluir disciplina:', error);
    }
  };

  const handleCheckboxChange = (courseId) => {
    setSelectedRows((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const handleViewDetails = (course) => {
    navigate(`/detalhes/id/${course.courseId}`);
  };

  const handleEditClick = (course) => {
    setIsEditing(true);
    setCurrentCourseId(course.courseId);
    setNewCourse({
      courseName: course.courseName,
      workload: course.workload,
      description: course.description,
    });
    setShowModal(true);
  };

  const handleEditCourse = async () => {
    try {
      await courseApi.put(`/mediotec/disciplinas/courseupdate/${currentCourseId}`, newCourse);
      fetchCourses();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao editar curso:', error);
    }
  };

  const handleAddCourse = async () => {
    try {
      await courseApi.post('/mediotec/disciplinas/', newCourse);
      fetchCourses();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao adicionar curso:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCourse({ courseName: '', workload: '', description: '' });
    setIsEditing(false);
  };

  // Função para exportar o PDF
  const handleExportPDF = () => {
    const element = document.getElementById('course-report');  // Elemento a ser exportado
    const opt = {
      margin: 0.5,
      filename: 'disciplinas.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  const filteredCourses = dataSource
    .filter(course => course.courseName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'alphabetic') return a.courseName.localeCompare(b.courseName);
      if (sortOption === 'mais_novo') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === 'mais_antigo') return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  return (
    <main>
      <Navbar />

      <div className='container mt-5'>
        <h1 className='titulo'>Gerenciamento de Disciplinas</h1>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            <button className="btn btn-success me-2" onClick={() => setShowModal(true)}>
              Adicionar
            </button>
            <button className="btn btn-danger" onClick={excluirDisciplina}>
              Excluir
            </button>
          </div>
          <button className="btn btn-outline-secondary" onClick={handleExportPDF}>
            Relatório
          </button>
        </div>

        <div className='row mt-3'>
          <div className='col-md-6'>
            <input
              type='text'
              className='form-control'
              placeholder='Procurar'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='col-md-3 mt-2 mt-md-0'>
            <select
              className='form-control'
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="alphabetic">A-Z</option>
              <option value="mais_novo">Mais Novo</option>
              <option value="mais_antigo">Mais Antigo</option>
            </select>
          </div>
        </div>

        {/* Conteúdo das Disciplinas */}
        <div className="row mt-4">
          {filteredCourses.map((course) => (
            <div className="col-12 mb-2" key={course.courseId}>
              <div className="border rounded p-3 course-card w-100">
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(course.courseId)}
                    onChange={() => handleCheckboxChange(course.courseId)}
                    className="me-3 checkbox"
                  />
                  <div className="w-100">
                    <strong className="d-block">
                      {course.courseName} | {course.classes[0]?.class.className} - {course.classes[0]?.class.year || 'Ano não definido'}
                    </strong>
                    <p className="mb-0 text-muted">
                      Professor: {course.classes[0]?.class.users[0]?.user.name || 'Sem professor'}
                    </p>
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <button className="btn btn-outline-secondary me-2" onClick={() => handleViewDetails(course)}>
                    <i className="bi bi-person-add"></i> Adicionar Professor e Turma
                  </button>
                  <button className="btn btn-outline-primary" onClick={() => handleEditClick(course)}>
                    <i className="bi bi-pencil-square"></i> Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabela Invisível para Relatório */}
        <div id="course-report" style={{ display: 'none' }}>
          <h1>Relatório de Disciplinas</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Nome da Disciplina</th>
                <th>Carga Horária</th>
                <th>Professor</th>
                <th>Ano da Turma</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.courseId}>
                  <td>{course.courseName}</td>
                  <td>{course.workload}</td>
                  <td>{course.classes[0]?.class.users[0]?.user.name || 'Sem professor'}</td>
                  <td>{course.classes[0]?.class.year || 'Ano não definido'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? 'Editar Disciplina' : 'Adicionar Disciplina'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
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
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Fechar</button>
                <button className="btn btn-primary" onClick={isEditing ? handleEditCourse : handleAddCourse}>
                  {isEditing ? 'Salvar Alterações' : 'Adicionar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CourseManagement;
