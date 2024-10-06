import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import notificationApi from '../../api';

import calendario from '../../images/calendario.png';
import courses from '../../images/courses.png';
import users from '../../images/users2.png';
import classes from '../../images/classes.png';
import conceitos from '../../images/conceito.png';

import Navbar from '../../components/navBar';

function HomePage() {
  const [dataSource, setDataSource] = useState([]);

  // Função para buscar os comunicados
  const fetchComunicados = async () => {
    try {
      const { data } = await notificationApi.get('/mediotec/notificacoes/');
      setDataSource(data);
    } catch (error) {
      console.error('Erro ao buscar comunicados:', error);
    }
  };

  // UseEffect para buscar os dados ao montar o componente
  useEffect(() => {
    fetchComunicados();
  }, []);

  return (
    <div className="HomePage">
      <Navbar />

      <div className="container-fluid bg-white py-4">
        <div className="row justify-content-center">
          {/* Seção dos ícones (Usuários, Disciplinas, Turmas, Conceitos) */}
          <div className="col-lg-8 d-flex justify-content-center">
            <div className="row quadrados">
              <div className="col-lg-4 background-roxo d-flex flex-column align-items-center mb-3">
                <Link className="text-white" to="/user-management">
                  <img src={users} alt="usuarios" className="img-fluid" />
                  <h5 className="mt-2 text-uppercase">Usuários</h5>
                </Link>
              </div>
              
              <div className="col-lg-4 background-roxo d-flex flex-column align-items-center mb-3">
                <Link className="text-white" to="/course-management">
                  <img src={courses} alt="disciplinas" className="img-fluid" />
                  <h5 className="mt-2 text-uppercase">Disciplinas</h5>
                </Link>
              </div>

              <div className="col-lg-4 background-roxo d-flex flex-column align-items-center mb-3">
                <Link className="text-white" to="/class">
                  <img src={classes} alt="turmas" className="img-fluid" />
                  <h5 className="mt-2 text-uppercase">Turmas</h5>
                </Link>
              </div>

              <div className="col-lg-4 background-roxo d-flex flex-column align-items-center mb-3">
                <Link className="text-white" to="/conceitos">
                  <img src={conceitos} alt="conceitos" className="img-fluid" />
                  <h5 className="mt-2 text-uppercase">Conceitos</h5>
                </Link>
              </div>
            </div>
          </div>

          {/* Seção dos Comunicados Recentes */}
          <div className="col-lg-3 mt-5">
            <div className="background-roxo-quadrado d-flex align-items-center justify-content-center mb-3">
              <h3 className="text-white text-center">Comunicados Recentes</h3>
            </div>
            <div className="bg-light p-3 comunicados">
              {dataSource.length > 0 ? (
                dataSource.map((comunicado, index) => (
                  <div key={index} className="mb-3">
                    <h5>{comunicado.title}</h5>
                    <p>{comunicado.content}</p>
                  </div>
                ))
              ) : (
                <p>Não há comunicados disponíveis.</p>
              )}
            </div>
          </div>
        </div>

        {/* Seção do Calendário */}
        <div className="row bg-light py-4 mt-4">
          <div className="col-lg-12 text-center">
            <h4 className="text-uppercase mb-3">Calendário</h4>
            <img src={calendario} alt="Calendário" className="img-fluid calendario" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
