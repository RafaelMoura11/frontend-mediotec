import React, { useEffect, useState } from 'react';
import '../course-menagement/CourseMenagement.css';
import '../../components/navbar/navBar';
import Navbar from '../../components/navbar/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import courseApi from '../../api';
import 'bootstrap-icons/font/bootstrap-icons.css';
import html2pdf from 'html2pdf.js'; // Importação da biblioteca html2pdf
import { Link } from 'react-router-dom';

function CourseManagement() {
  const [dataSource, setDataSource] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false); // Novo estado para o modal de detalhes
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    workload: '',
    description: '',
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // Novo estado para os detalhes da disciplina

  const handleOpenModal = () => {
    setShowModal(true);
    setIsEditing(false);
    setNewCourse({ courseName: '', workload: '', description: '' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCourse({ courseName: '', workload: '', description: '' });
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedCourse(null);
  };

  const fetchCourses = async () => {
    try {
      const { data } = await courseApi.get('/mediotec/disciplinas/');
      setDataSource(data);
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
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

  const handleEditCourse = async () => {
    try {
      await courseApi.put(`/mediotec/disciplinas/courseupdate/${currentCourseId}`, newCourse);
      fetchCourses();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao editar curso:', error);
    }
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

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setShowDetailModal(true); // Abre o modal de detalhes
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

  // Função para exportar o conteúdo como PDF
  const handleExportPDF = () => {
    const element = document.getElementById('exportTable'); // Seleciona o conteúdo que será exportado
    const opt = {
      margin: 0.5,
      filename: 'disciplinas.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save(); // Gera o PDF a partir do conteúdo
  };

  return (
    <main>
      <Navbar />

      <div className='container-fluid bg-white mt-5'>
        <h1 className='display-6 text-center'>Gerenciamento de Disciplinas</h1>
        <li>
                <Link className="nav-link" to='/detalhes' activeClassName="active-link">
                Detalhes
                </Link>
                </li>
        <div className='row mt-4'>
          <div className='col-12 d-flex justify-content-between'>
            <div>
              <button className='btn btn-success me-2' onClick={handleOpenModal}>
                Adicionar Disciplina
              </button>
              <button className='btn btn-danger' onClick={excluirDisciplina}>
                Excluir
              </button>
            </div>
            <button className='btn btn-primary' onClick={handleExportPDF}>Exportar</button>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-12 col-md-6'>
            <input type='text' className='form-control' placeholder='Pesquisar' />
          </div>
          <div className='col-12 col-md-3 mt-2 mt-md-0'>
            <select className='form-control'>
              <option value="alphabetic">A-Z</option>
              <option value="mais_novo">Mais Novo</option>
              <option value="mais_antigo">Mais Antigo</option>
            </select>
          </div>
        </div>

        <div className='row mt-5' id="exportTable"> {/* Este ID vai encapsular a tabela para exportação */}
          <div className='col-12'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th scope='col'></th>
                    <th scope='col'>Disciplina</th>
                    <th scope='col'>Turma</th>
                    <th scope='col'>Carga Horária</th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {dataSource.map((course) => (
                    <tr key={course.courseId}>
                      <td>
                        <input
                          type='checkbox'
                          checked={selectedRows.includes(course.courseId)}
                          onChange={() => handleCheckboxChange(course.courseId)}
                        />
                      </td>
                      <td onClick={() => handleViewDetails(course)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                        {course.courseName}
                      </td>
                      <td>{course.className || 'Turma não definida'}</td>
                      <td>{course.workload}</td>
                      <td>
                        <button className='btn' onClick={() => handleEditClick(course)}>
                          <i className="bi bi-pencil-square"></i> Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
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
      )}

      {showDetailModal && selectedCourse && ( // Modal para exibir detalhes da disciplina
        <div className="modal show " style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content  modal-tamanho">
              <div className="modal-header">
                <h5 className="modal-title">Detalhes da Disciplina</h5>
                
                <button type="button" className="btn-close" onClick={handleCloseDetailModal}></button>
              </div>
              <div className="modal-body">
        
                <h5 className='fw-bold'>Nome da Disciplina: {selectedCourse.courseName}</h5>
                <h5>Carga Horária:  {selectedCourse.workload}</h5>
                <h6 className='fw-bold'>Ementa:</h6>
                <p>{selectedCourse.description}</p>
                <h6>Turma: {selectedCourse.className || 'Turma não definida'}</h6>
              </div>
              <div className="modal-footer">
              <button className='btn roxo botao-ementa'>Cadastrar Conceitos</button>
                <button className="btn roxo botao-ementa" onClick={handleCloseDetailModal}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default CourseManagement;
