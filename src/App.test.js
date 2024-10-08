import React, { useState } from 'react';
import {
  Button,
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
} from '@mui/material';

// Componente principal
function UserManagement() {
  const [options] = useState([
    { value: 'opcao1', viewValue: 'Opção 1' },
    { value: 'opcao2', viewValue: 'Opção 2' },
    { value: 'opcao3', viewValue: 'Opção 3' },
  ]);

  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataSource, setDataSource] = useState([
    { nome: 'John Doe', email: 'john@example.com', telefone: '123-456', dataContratacao: '2021-01-01' },
    { nome: 'Jane Smith', email: 'jane@example.com', telefone: '789-012', dataContratacao: '2022-02-02' },
  ]);

  // Funções para manipular os eventos
  const adicionarUsuario = () => {
    const novoUsuario = {
      nome: 'Novo Usuário',
      email: 'novo@example.com',
      telefone: '999-888',
      dataContratacao: '2024-01-01',
    };
    setDataSource((prevData) => [...prevData, novoUsuario]);
  };

  const excluirUsuarios = () => {
    const updatedDataSource = dataSource.filter(
      (row) => !selectedRows.includes(row)
    );
    setDataSource(updatedDataSource);
    setSelectedRows([]);
  };

  const exportarUsuarios = () => {
    console.log('Exportar usuários:', dataSource);
  };

  // Função para manipular a pesquisa
  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = options.filter((option) =>
      option.viewValue.toLowerCase().includes(searchValue)
    );

    setFilteredOptions(filtered);
  };

  const handleRowToggle = (row) => {
    setSelectedRows((prev) =>
      prev.includes(row)
        ? prev.filter((r) => r !== row)
        : [...prev, row]
    );
  };

  const isSelected = (row) => selectedRows.includes(row);

  return (
    <main>
      <h1>Gerenciamento de Usuários</h1>

      <div className="button-row">
        <Button variant="outlined" onClick={adicionarUsuario}>
          Adicionar usuário
        </Button>
        <Button variant="outlined" onClick={excluirUsuarios}>
          Excluir
        </Button>
        <Button variant="outlined" onClick={exportarUsuarios}>
          Exportar
        </Button>
      </div>

      <div className="selecao">
        <FormControl>
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

        <FormControl>
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

        <TextField
          label="Pesquisar"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Digite para pesquisar..."
        />
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < dataSource.length
                  }
                  checked={
                    dataSource.length > 0 && selectedRows.length === dataSource.length
                  }
                  onChange={(e) =>
                    setSelectedRows(e.target.checked ? dataSource : [])
                  }
                />
              </TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Data de Contratação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSource.map((row) => (
              <TableRow key={row.nome}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(row)}
                    onChange={() => handleRowToggle(row)}
                  />
                </TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.telefone}</TableCell>
                <TableCell>{row.dataContratacao}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}

export default UserManagement;
