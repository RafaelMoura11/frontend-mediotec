import React, { useState, useEffect } from 'react';
import './home-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import courses from '../../images/courses.png'; // Importando a imagem como variável
import users from '../../images/users2.png';
import classes from '../../images/classes.png';
import conceitos from '../../images/conceito.png';
import Navbar from '../../components/navBar';
import { Link } from 'react-router-dom';
import notificationApi from '../../api';
import calendario from '../../images/calendario.png';
import { Modal, Button } from 'react-bootstrap'; // Importando componentes do Bootstrap para o modal

function HomePage() {
  const [dataSource, setDataSource] = useState([]); // Estado para armazenar os dados das notificações.
  const [selectedComunicado, setSelectedComunicado] = useState(null); // Estado para armazenar o comunicado selecionado
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal

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

  // Função para abrir o modal com o comunicado selecionado
  const handleShowModal = (comunicado) => {
    setSelectedComunicado(comunicado); // Define o comunicado selecionado
    setShowModal(true); // Abre o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedComunicado(null); // Limpa o comunicado selecionado ao fechar o modal
  };

  return (
    <div className="HomePage">
      <Navbar />
      <div className='container-fluid bg-white'>
        <div className='row'>
          <div className='col-lg-8 d-flex'>
            <div className='row quadrados'>
              <div className='col-lg-4 background-roxo d-flex flex-column align-items-center me-2'>
                <Link className='text-white' to="/user-management" >
                  <img src={users} alt="usuarios" className='img-fluid' />
                  <h5 className='mt-2 text-uppercase'>Usuarios</h5>
                </Link>
              </div>
              <div className='col-lg-4 background-roxo d-flex flex-column align-items-center me-2'>
                <Link className='text-white' to="/course-management">
                  <img src={courses} alt="disciplinas" className='img-fluid' />
                  <h5 className='mt-2 text-uppercase'>Disciplinas</h5>
                </Link>
              </div>
              <div className='col-lg-4 background-roxo d-flex flex-column align-items-center'>
                <Link className="text-white" to="/class">
                  <img src={classes} alt="turmas" className='img-fluid' />
                  <h5 className='mt-2 text-uppercase'>Turmas</h5>
                </Link>
              </div>
              <div className='col-lg-4 background-roxo d-flex flex-column align-items-center'>
                <Link className='text-white'>
                  <img src={conceitos} alt="conceitos" className='img-fluid' />
                  <h5 className='mt-2 text-uppercase'>Conceitos</h5>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-lg-4 mt-4'>
            <div className='background-roxo-quadrado d-flex align-items-center justify-content-center'>
              <h3 className='text-white text-center'>Comunicados Recentes</h3>
            </div>
            <div className='bg-light comunicados'>
              {dataSource.length > 0 ? (
                dataSource.map((comunicado, index) => (
                  <div className='back-branco mt-3' key={index}>
                    {/* Ao clicar no título, chamamos a função handleShowModal */}
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
          <div className='row bg-light container-calendario'>
            <div className='col-lg-10'>
              <h4 className='text-uppercase fonte-calendario'>Calendário</h4>
              <img className='img img-fluid calendario' src={calendario} alt="Calendário"></img>
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
