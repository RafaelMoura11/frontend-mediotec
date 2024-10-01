import React, { useState, useEffect } from 'react';
import '../user-management/userManagement.css'; 
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogContent,
} from '@mui/material';
import usersApi from '../../api';
import { formatDate, formatPhone } from '../../utils/formatFields';
import 'bootstrap/dist/css/bootstrap.min.css';

import CreatePage from '../../components/createUser/CreateUser';
import Navbar from '../../components/navbar/navBar'

// Componente principal
function UserManagement() {
  const [filteredOptions] = useState([
    { value: 'coordenador', viewValue: 'Coordenador' },
    { value: 'professor', viewValue: 'Professor' },
    { value: 'aluno', viewValue: 'Aluno' },
  ]);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await usersApi.get('/mediotec/usuarios/');
      setDataSource(data);
    }
    fetchUsers();
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Funções para manipular os eventos
  // const adicionarUsuario = () => {
  //   console.log('Adicionar usuário');
  //   // Lógica para adicionar um novo usuário pode ser implementada aqui
  // };

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

  const exportarUsuarios = () => {
    console.log('Exportar usuários');
    // Lógica para exportar os usuários pode ser implementada aqui
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

  // Filtrar usuários com base no texto de pesquisa
  const filteredUsers = dataSource.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.phone.includes(searchText)
  );

  return (
    <main>

      <Navbar></Navbar>
      <div className='container'>
        <h1 className='titulo'>Gerenciamento de Usuários</h1>
        
        
        <div className="button-row">
          <div className='button-crud'>
            <button type="button" className="btn btn-success" onClick={handleClickOpen}>Adicionar Usuário</button>
            <button className='btn btn-primary' disabled={!(selectedRows.length === 1)} variant="outlined" onClick={handleClickOpen}>Atualizar</button>
            <button type="button" className="btn btn-danger" onClick={excluirUsuarios}>Excluir</button>
          </div>

          <div className='button-export'>
            <button type="button" className="btn btn-secondary" onClick={exportarUsuarios}>Exportar</button>
          </div>
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

          <FormControl className='selecao_opcao'>
            <InputLabel>Selecione uma opção</InputLabel>
            <Select
              value={selectedOption2}
              onChange={(e) => setSelectedOption2(e.target.value)}
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

        <TableContainer>
          <Table className='table'>
            <TableHead className='tabela_topo'>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < dataSource.length}
                    checked={dataSource.length > 0 && selectedRows.length === dataSource.length}
                    onChange={(e) => setSelectedRows(e.target.checked ? dataSource : [])}
                  />
                </TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Data de Contratação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((row) => (
                <TableRow key={row.name}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row)}
                      onChange={() => handleRowToggle(row)}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{formatPhone(row.phone)}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      <Dialog open={open} fullWidth>
        <DialogContent>
          <CreatePage handleClose={handleClose} user={selectedRows[0]} />
        </DialogContent>
      </Dialog>
        </div>
      </div>
    </main>
  );
}

export default UserManagement;
