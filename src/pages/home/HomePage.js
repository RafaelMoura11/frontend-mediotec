import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import notificationApi from '../../api';

import Navbar from '../../components/navBar';

import courses from '../../images/courses.png';
import users from '../../images/users2.png';
import classes from '../../images/classes.png';
import conceitos from '../../images/conceito.png';
import calendario from '../../images/calendario.png';

function HomePage() {
  const [dataSource, setDataSource] = useState([]); 
  const [selectedComunicado, setSelectedComunicado] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

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
    fetchComunicados();
  }, []);

  const handleShowModal = (comunicado) => {
    setSelectedComunicado(comunicado); 
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComunicado(null); 
  };

  return (
    <div className="HomePage">
      <Navbar />
      <div className='container-fluid container'>
        <div className='row custom-row'>
          
          {/* Coluna principal com ícones e calendário */}
          <div className='col-lg-8'>

            {/* Seção de Ícones */}
            <div className='row quadrados'>
              <div className='col-lg-6 background-roxo d-flex flex-column align-items-center'>
                <Link className='text-white' to="/user-management">
                  <img src={users} alt="Usuarios" className='img-fluid' />
                  <h5 className='mt-2 text-uppercase'>Usuarios</h5>
                </Link>
              </div>
              <div className='col-lg-6 background-roxo d-flex flex-column align-items-center'>
                <Link className='text-white' to="/course-management">
                  <img src={courses} alt="Disciplinas" className='img-fluid' />
                  <h5 className='mt-2 text-uppercase'>Disciplinas</h5>
                </Link>
              </div>
              <div className='col-lg-4 background-roxo d-flex flex-column align-items-center'>
                <Link className="text-white" to="/class">
                  <img src={classes} alt="turmas" className='img-fluid' />
                  <h5 className='mt-2 text-uppercase'>Turmas</h5>
                </Link>
              </div>
              <div className='col-lg-6 background-roxo d-flex flex-column align-items-center'>
                <Link className='text-white'>
                  <img src={conceitos} alt="Conceitos" className='img-fluid' />
                  <h5 className='mt-2 text-uppercase'>Conceitos</h5>
                </Link>
              </div>
            </div>
            
            {/* Seção do Calendário */}
            <div className='row container-calendario'>
              <div className='col-lg-12'>
                <h4 className='text-uppercase fonte-calendario'>Calendário</h4>
                <img className='img img-fluid calendario' src={calendario} alt="Calendário"></img>
              </div>
            </div>

          </div>
          
          {/* Coluna da seção de Comunicados Recentes */}
          <div className='col-lg-4'>
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
                  </div>
                ))
              ) : (
                <p>Não há comunicados disponíveis.</p>
              )}
              <div className='d-flex justify-content-end'>
                <button className='btn btn-roxo'>Ver mais</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal para exibir o comunicado completo */}
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
    </div>
  );
}

export default HomePage;
