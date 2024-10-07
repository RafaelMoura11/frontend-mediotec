import React, { useEffect, useState } from 'react';
import '../course-menagement/courseMenagement.css';
import Navbar from '../../components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import html2pdf from 'html2pdf.js';
import { Link } from 'react-router-dom';
import courseApi from '../../api';
import CourseModal from '../../components/CourseModal';

function CourseManagement() {
  const [dataSource, setDataSource] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    workload: '',
    description: '',
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleOpenModal = () => {
    setShowModal(true);
    setIsEditing(false);
    setNewCourse({ courseName: '', workload: '', description: '' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCourse({ courseName: '', workload: '', description: '' });
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

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <main>
      <Navbar />

      <div className='container mt-5 coursePage'>
        <h1 className='titulo'>Gerenciamento de Disciplinas</h1>

        <div className='row mt-4'>
          <div className='col-12 d-flex justify-content-between'>
            <div>
              <button className='btn btn-success me-2' onClick={handleOpenModal}>
                Adicionar Disciplina
              </button>

              <button className='btn btn-danger me-2' onClick={() => console.log('Excluir')}>Excluir</button>

              <Link to='/detalhes'>
                <button className='btn btn-secondary me-2'>Adicionar disciplina à turma</button>
              </Link>
            </div>
            <button className='btn btn-primary'>Exportar</button>
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

        <div className='row mt-5'>
          <div className='col-12'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead className='bg-light'>
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
                        <input type='checkbox' />
                      </td>
                      <td>{course.courseName}</td>
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

      {/* Chama o modal separado */}
      <CourseModal
        showModal={showModal}
        isEditing={isEditing}
        newCourse={newCourse}
        setNewCourse={setNewCourse}
        handleCloseModal={handleCloseModal}
        handleAddCourse={handleAddCourse}
        handleEditCourse={handleEditCourse}
      />
    </main>
  );
}

export default CourseManagement;
