import React, { useState, useEffect } from 'react';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import usersApi from '../../api';
import { formatDate, formatPhone } from '../../utils/formatFields';
import 'bootstrap/dist/css/bootstrap.min.css';
import html2pdf from 'html2pdf.js';

import CreatePage from '../../components/CreateUser';
import Navbar from '../../components/navBar';

function UserManagement() {
  const [filteredOptions] = useState([
    { value: 'ALL', viewValue: 'Todos' },
    { value: 'COORDINATOR', viewValue: 'Coordenador' },
    { value: 'TEACHER', viewValue: 'Professor' },
    { value: 'STUDENT', viewValue: 'Aluno' },
  ]);
  const [selectedOption1, setSelectedOption1] = useState('ALL');
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);

  // Novo estado para armazenar o usuário selecionado para o modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Função para buscar usuários com base no tipo selecionado
  useEffect(() => {
    const fetchUsersByRole = async () => {
      try {
        if (selectedOption1 === 'ALL') {
          const { data } = await usersApi.get('/mediotec/usuarios/');
          setDataSource(data);
        } else {
          const { data } = await usersApi.get(`/mediotec/usuarios/role/${selectedOption1}`);
          setDataSource(data.length ? data : []);  // Se não encontrar resultados, define lista vazia
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setDataSource([]);
      }
    };

    fetchUsersByRole();
  }, [selectedOption1]);

  function getRoleName(role) {
    switch (role) {
      case 'STUDENT':
        return 'Aluno';
      case 'TEACHER':
        return 'Professor';
      case 'COORDINATOR':
        return 'Coordenador';
      default:
        return 'Desconhecido'; // Caso algum role não mapeado apareça
    }
  }

  const handleClickOpen = (user) => {
    setUserToUpdate(user)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const excluirUsuarios = () => {
    selectedRows.forEach(async (user) => {
      try {
        await usersApi.delete(`/mediotec/usuarios/delete/${user.userId}`);
        console.log(user.userId);
      } catch (e) {
        console.log(e);
      }
    })
    setDataSource((prev) => prev.filter((user) => {
      return !selectedRows.includes(user)
    }));
    setSelectedRows([]);
  };

  // Função para exportar relatório em PDF
  const exportarRelatorio = () => {
    const element = document.createElement('div');
    element.innerHTML = `
      <h2>Relatório de Usuários</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid black; padding: 8px;">Nome</th>
            <th style="border: 1px solid black; padding: 8px;">Email</th>
            <th style="border: 1px solid black; padding: 8px;">Função</th>
            <th style="border: 1px solid black; padding: 8px;">Telefone</th>
            <th style="border: 1px solid black; padding: 8px;">Data de Cadastro</th>
          </tr>
        </thead>
        <tbody>
          ${filteredUsers.map(user => `
            <tr>
              <td style="border: 1px solid black; padding: 8px;">${user.name}</td>
              <td style="border: 1px solid black; padding: 8px;">${user.email}</td>
              <td style="border: 1px solid black; padding: 8px;">${getRoleName(user.role)}</td>
              <td style="border: 1px solid black; padding: 8px;">${formatPhone(user.phone)}</td>
              <td style="border: 1px solid black; padding: 8px;">${formatDate(user.createdAt)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    const opt = {
      margin: 0.5,
      filename: 'relatorio_usuarios.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleRowToggle = (row) => {
    setSelectedRows((prev) =>
      prev.includes(row)
        ? prev.filter((r) => r !== row)
        : [...prev, row]
    );
  };

  const isSelected = (row) => selectedRows.includes(row);

  const filteredUsers = dataSource.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.phone.includes(searchText)
  );

  // Função para abrir o modal com informações do usuário
  const handleUserClick = (user) => {
    setSelectedUser(user);  // Armazena o usuário selecionado
    setModalOpen(true);     // Abre o modal
  };

  const handleModalClose = () => {
    setModalOpen(false);    // Fecha o modal
    setSelectedUser(null);  // Reseta o usuário selecionado
  };

  return (
    <main>
      <Navbar></Navbar>
      <div className='container mt-5'>
        <h1 className='titulo'>Gerenciamento de Usuários</h1>

        <div className="button-row">
          <button type="button" className="btn btn-success me-2" onClick={() => handleClickOpen(null)}>Adicionar Usuário</button>
          <button type="button" className="btn btn-danger me-2" onClick={excluirUsuarios}>Excluir</button>
          <button type="button" className="btn btn-outline-secondary" onClick={exportarRelatorio}>Relatório</button>
        </div>

        <div className='container-table'>
          <div className="selecao">
            <FormControl className='selecao_opcao'>
              <InputLabel>Selecione uma opção</InputLabel>
              <Select
                value={selectedOption1}
                onChange={(e) => setSelectedOption1(e.target.value)}
              >
                <MenuItem value="" disabled>
                  Selecione uma opção
                </MenuItem>
                {filteredOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.viewValue}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField className='selecao_barra'
              label="Pesquisar"
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Digite para pesquisar..."
            />
          </div>

          <div className="row mt-4">
            {filteredUsers.map((user) => (
              <div className="col-12 mb-2" key={user.userId}>
                <div className="border rounded p-3 course-card w-100">
                  <div className="d-flex align-items-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(user)}
                      onChange={() => handleRowToggle(user)}
                      className="me-3 checkbox"
                    />
                    <div className="w-100">
                      <strong className="d-block">
                        {user.name} | {user.email}
                      </strong>
                      <p className="mb-0 text-muted">
                        {getRoleName(user.role)} {/* Tipo de usuário formatado */}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex mt-2">
                    <button className="btn btn-outline-secondary me-2" onClick={() => handleUserClick(user)}>
                      <i className="bi bi-eye"></i> Ver Detalhes
                    </button>
                    <button className="btn btn-outline-primary" onClick={() => handleClickOpen(user)}>
                      <i className="bi bi-pencil-square"></i> Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal para exibir informações detalhadas do usuário */}
          <Dialog open={modalOpen} onClose={handleModalClose}>
            <DialogTitle>Informações do Usuário</DialogTitle>
            <DialogContent>
              {selectedUser && (
                <div>
                  <p><strong>Nome:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Telefone:</strong> {formatPhone(selectedUser.phone)}</p>
                  <p><strong>Data de Cadastro:</strong> {formatDate(selectedUser.createdAt)}</p>
                </div>
              )}
              <Button onClick={handleModalClose} color="primary">Fechar</Button>
            </DialogContent>
          </Dialog>

          <Dialog open={open} fullWidth>
            <DialogContent>
              <CreatePage handleClose={handleClose} user={userToUpdate} setDataSource={setDataSource} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

    </main>
  );
}

export default UserManagement;
