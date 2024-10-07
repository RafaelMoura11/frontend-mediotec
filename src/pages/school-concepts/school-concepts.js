import React from 'react';
import { Table, Button } from 'react-bootstrap';
import "../school-concepts/school-concepts.css"

import Navbar from '../../components/navbar/navBar';

const SchoolConcepts = () => {
  return (
    <main>
    <Navbar></Navbar>
    <div style={{ backgroundColor: '#f8f9fa'}}>
      <h1 className="text-left mb-4">Conceitos</h1>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="titulo">Português 1A 2024</h3>
        <div className="legenda"> 
          <p>Excelente: EX</p>
          <p>Ótimo: OT</p>
          <p>Bom: B</p>
          <p>Ainda Não Suficiente: ANS</p>
          <p>Insuficiente: I</p>
        </div>
      </div>
      <Table className='tabela' striped bordered hover>
        <thead>
          <tr className='tabela-topo'>
            <th>Alunos</th>
            <th>1ª Unidade</th>
            <th>2ª Unidade</th>
            <th>Rec</th>
            <th>Média</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cristina</td>
            <td>EX</td>
            <td>OT</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Lucas</td>
            <td>B</td>
            <td>OT</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Maria</td>
            <td>ANS</td>
            <td>B</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>João</td>
            <td>ANS</td>
            <td>B</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Fabrício</td>
            <td>ANS</td>
            <td>B</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Felipe</td>
            <td>ANS</td>
            <td>B</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Julia</td>
            <td>ANS</td>
            <td>B</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
      <div className="botao">
        <Button className='botao-salvar' variant="success">Salvar</Button>
        <Button className='botao-voltar' variant="secondary">Voltar</Button>
      </div>
    </div>
    </main>
  );
};

export default SchoolConcepts;
