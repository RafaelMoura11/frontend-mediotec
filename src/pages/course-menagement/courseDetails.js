import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseApi from '../../api';
import './courseDetails.css'

function DisciplinaPage() {
 /* const { id } = useParams(); // Pega o ID da rota
  const [course, setCourse] = useState(null);

  const fetchCourseDetails = async () => {
    try {
      const { data } = await courseApi.get(`/mediotec/disciplinas/${id}`); // Altere a rota para corresponder à sua API
      setCourse(data);
    } catch (error) {
      console.error('Erro ao buscar detalhes da disciplina:', error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>; // Renderiza um carregando enquanto espera a resposta
    <div>
      <h1>{course.courseName}</h1>
      <p>{course.description}</p>
      <p>Carga Horária: {course.workload}</p>
    
    </div>
  }
*/
  return (
    <div className='container-fluid  bg-light '>
        <div className='row'>
            <div className='col-lg-12 d-flex justify-content-between bg-roxo'>
                <h2 className='text-uppercase text-white '>Nome da Disciplina</h2>
                <button className='btn roxo botao-ementa'>Cadastrar Conceitos</button>
            </div>
            <div className='col-lg-10  rounded pill p-2  roxo mt-4 d-flex justify-content-between'>
                <h5>Professor: </h5>
                <select className='border rounded pill'>
                    <option value="" >Selecione um professor</option>
                    <option>Geraldo</option>
                    <option>Rafaela</option>
                </select>

            </div>
            <div className='col-lg-10  rounded pill p-2  roxo mt-4 d-flex justify-content-between'>
             <h5>Carga Horária: 160h</h5>    
            </div>
            <div className='col-lg-10  rounded pill p-2 roxo mt-4 d-flex justify-content-between'>
            <h5>Turma:</h5>
                <select className='ml-2 border rounded pill' >
                 <option value="" >Selecione uma turma</option>
                    <option>3A</option>
                    <option>3B</option>
                </select>
            </div>

            <div className='col-lg-10  rounded pill p-2 roxo mt-4 '>
                <h6>Ementa</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio, et dictum libero tincidunt nec.

                </p>
            </div>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-secondary'>Voltar</button>
            </div>
        </div>
    
    </div>
 
  );
}

export default DisciplinaPage;
