import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseApi from '../../api';
import './courseDetails.css'

function DisciplinaPage() {
 
const [course, setCourse] = useState( {
  
    courseId: '',
    courseName: '',
    description: '',
    workload: ''
  

})

const { courseId } = useParams();

useEffect(() => {
  const fetchCourseById = async (id) => {
    try {
      const { data } = await courseApi.get(`/mediotec/disciplinas/id/${id}`);
      setCourse(data);
    } catch (error) {
      console.error('Erro ao buscar detalhes da disciplina:', error);
    }
  };

  fetchCourseById(courseId);
}, [courseId]);
if (!course) {
  return <div>Loading...</div>;
}
return (
  <div className='container-fluid bg-light'>
    {/* Renderização normal quando course está presente */}
    <div className='row'>
      <div className='col-lg-12 d-flex justify-content-between bg-roxo'>
        <h2 className='text-uppercase text-white'>{course.courseName}</h2>
        <button className='btn roxo botao-ementa'>Cadastrar Conceitos</button>
      </div>
      <div className='col-lg-10 rounded pill p-2 roxo mt-4 d-flex justify-content-between'>
        <h5>Professor: </h5>
        <select className='border rounded pill'>
          <option value="">Selecione um professor</option>
          <option>Geraldo</option>
          <option>Rafaela</option>
        </select>
      </div>
      <div className='col-lg-10 rounded pill p-2 roxo mt-4 d-flex justify-content-between'>
        <h5>{course.workload}</h5>
      </div>
      <div className='col-lg-10 rounded pill p-2 roxo mt-4 d-flex justify-content-between'>
        <h5>Turma:</h5>
        <select className='ml-2 border rounded pill'>
          <option value="">Selecione uma turma</option>
          <option>3A</option>
          <option>3B</option>
        </select>
      </div>
      <div className='col-lg-10 rounded pill p-2 roxo mt-4'>
        <h6>Ementa</h6>
        <p>
        {course.description}
        </p>
      </div>
      <div className='d-flex justify-content-end'>
        <button className='btn btn-secondary'>Voltar</button>
        <button className='btn btn-primary'>Atribuir</button>
      </div>
    </div>
  </div>
);}
export default DisciplinaPage;
