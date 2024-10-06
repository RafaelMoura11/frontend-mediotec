import React,  { useState, useEffect } from 'react';
import './home-style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import courses from '../../images/courses.png'; // Importando a imagem como variável
import users from '../../images/users2.png';
import classes from '../../images/classes.png';
import conceitos from '../../images/conceito.png';
import Navbar from '../../components/navbar/navBar';
import { Link, NavLink } from 'react-router-dom';
import notificationApi from '../../api';
import calendario from '../../images/calendario.png';


function HomePage() {
  const [dataSource, setDataSource] = useState([]); // Estado para armazenar os dados das notificações.


  // Função para buscar os comunicados
  const fetchComunicados = async () => {
    try {
      const { data } = await notificationApi.get('/mediotec/notificacoes/');
      setDataSource(data); // Atualiza o estado com os dados recebidos.
    } catch (error) {
      console.error('Erro ao buscar comunicados:', error);
    }
  };

  // UseEffect para chamar a função quando o componente é montado
  useEffect(() => {
    fetchComunicados(); // Chama a função ao montar o componente
  }, []);

  return (
    <div className="HomePage">
         <Navbar />
      <div className='container-fluid bg-white'>
        <div className='row'>
          <div className='col-lg-8 d-flex'> {/* Mantendo col-lg-9 */}
            <div className='row quadrados'>
              <div></div>
              <div className='col-lg-4  background-roxo d-flex flex-column align-items-center me-2 '> {/* Ajustado para col-lg-4 */}
                <Link className='text-white' to="/user-management" >
                <img src={users} alt="usuarios" className='img-fluid' /> {/* Adicionando a classe img-fluid */}
                <h5 className='mt-2 text-uppercase'>Usuarios</h5>
                </Link>
              </div>
              <div className='col-lg-4 background-roxo d-flex flex-column align-items-center me-2'> {/* Ajustado para col-lg-4 */}
                <Link className='text-white'to="/course-management">
                <img src={courses} alt="disciplinas" className='img-fluid' /> {/* Adicionando a classe img-fluid */}
                <h5 className='mt-2 text-uppercase'>Disciplinas</h5>
                </Link>
              </div>
           
          
              <div className='col-lg-4 background-roxo d-flex flex-column align-items-center '> {/* Ajustado para col-lg-4 */}
                <Link className="text-white "to="/course-management">
                <img src={classes} alt="turmas" className='img-fluid' /> {/* Adicionando a classe img-fluid */}
                <h5 className='mt-2 text-uppercase'>Turmas</h5>
                </Link  >
              </div>
              <div className='col-lg-4 background-roxo d-flex flex-column align-items-center'> {/* Ajustado para col-lg-4 */}
                <Link className='text-white'>
                <img src={conceitos} alt="conceitos" className='img-fluid' /> {/* Adicionando a classe img-fluid */}
                <h5 className='mt-2 text-uppercase'>Conceitos</h5>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-lg-3 mt-5'> {/* Mantenha a coluna dos comunicados como col-lg-3 */}
            <div className='background-roxo-quadrado  d-flex align-items-center justify-content-center'>
              <h3 className='text-white text-center'>Comunicados Recentes</h3>
            </div>
            <div className='bg-light comunicados'>
            {dataSource.length > 0 ? ( // Verifica se há dados para mostrar
              dataSource.map((comunicado, index) => (
                <div key={index}>
                  <p>{comunicado.title}</p> {/* Substitua 'title' pelo campo correto que você deseja exibir */}
                  <p>{comunicado.content}</p> {/* Substitua 'content' pelo campo correto que você deseja exibir */}
                </div>
              ))
            ) : (
              <p>Não há comunicados disponíveis.</p> // Mensagem caso não haja dados
            )}
            </div>
           
          </div>
          
          <div className='row bg-light container-calendario'>
              <div className='col-lg-10'>
                <h4 className='text-uppercase '>Calendário</h4>
                <img className=' img img-fluid calendario' src={calendario}></img>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; // Não esqueça de exportar o componente
