import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import './courseDetails.css'
import { Navbar } from 'react-bootstrap';

function DisciplinaPage() {
const navigate = useNavigate();
const [fields, setFields] = useState({
  userId: '',
  classId: ''
});

 
const [course, setCourse] = useState( {
  
    courseId: '',
    courseName: '',
    description: '',
    workload: ''
  

})

const [teachers, setTeachers] = useState([])
const [classes, setClasses] = useState([])

const { courseId } = useParams();

const handleChange = (e) => {
  const { id, value } = e.target;
  setFields({
      ...fields,
      [id]: value,
  });
};

useEffect(() => {
  const fetchCourseById = async (id) => {
    try {
      const { data: disciplina } = await api.get(`/mediotec/disciplinas/id/${id}`);
      const { data: professores } = await api.get("/mediotec/usuarios/role/TEACHER");
      const { data: turmas } = await api.get("/mediotec/turmas");
      setCourse(disciplina);
      setTeachers(professores);
      setClasses(turmas);
    } catch (error) {
      console.error('Erro ao buscar detalhes da disciplina:', error);
    }
  };

  fetchCourseById(courseId);
}, [courseId]);

const postHandler = async () => {
  try {
    const userCourse = { userId: fields.userId, courseId };
    const classCourse = { classId: fields.classId, courseId };
    const userClass = { userId: fields.userId, classId: fields.classId };
    await api.post('/mediotec/usuarioDisc', userCourse);
    await api.post('/mediotec/turmaDisc', classCourse);
    await api.post('/mediotec/turmaUsuario', userClass);
    navigate('/course-management');
  } catch (error) {
      console.error(error);
  }
}

if (!course) {
  return <div>Loading...</div>;
}
return (
  <div className='container-fluid bg-light'>
    <Navbar></Navbar>
    {/* Renderização normal quando course está presente */}
    <div className='row bloco-principal'>
      <div className='col-lg-12 d-flex justify-content-between bg-roxo'>
        <h2 className='text-uppercase text-white mt-2'>{course.courseName}</h2>
        <button className='btn roxo botao-ementa'>Cadastrar Conceitos</button>
      </div>
      <div className='col-lg-10 rounded pill p-2 roxo mt-4 d-flex justify-content-between'>
        <h5>Professor: </h5>
        <select className='border rounded pill' id="userId" onChange={handleChange}>
          <option value="">Selecione um professor</option>
          {
            teachers.map((teacher) => <option value={ teacher.userId }>{ teacher.name }</option>)
          }
        </select>
      </div>
      <div className='col-lg-10 rounded pill p-2 roxo mt-4 d-flex justify-content-between'>
        <h5>{course.workload}</h5>
      </div>
      <div className='col-lg-10 rounded pill p-2 roxo mt-4 d-flex justify-content-between'>
        <h5>Turma:</h5>
        <select className='ml-2 border rounded pill' id="classId" onChange={handleChange}>
          <option value="">Selecione uma turma</option>
          {
            classes.map((cls) => <option value={ cls.classId }>{ cls.className } - { cls.year }</option>)
          }
        </select>
      </div>
      <div className='col-lg-10 rounded pill p-2 roxo mt-4'>
        <h6>Ementa</h6>
        <p>
        {course.description}
        </p>
      </div>
      <div className='d-flex justify-content-end'>
        <button className='btn btn-secondary' onClick={ () => navigate('/course-management') }>Voltar</button>
        <button className='btn btn-primary' onClick={ postHandler }>Atribuir</button>
      </div>
    </div>
  </div>
);}
export default DisciplinaPage;
