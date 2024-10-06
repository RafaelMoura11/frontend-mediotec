import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const DisciplinaPage = () => {
    return (
      <div className="container mt-5">
        <div className="header">
          <h2>Disciplina</h2>
          <h3>Português 1A 2024</h3>
        </div>
        <form>
          <div className="mb-3 row">
            <div className="col-md-6">
              <label htmlFor="professor" className="form-label">Professor</label>
              <div className="input-group">
                <select id="professor" className="form-select">
                  <option value="Geraldo">Geraldo</option>
                  <option value="Outro">Outro</option>
                </select>
                <button type="button" className="edit-btn">✎</button>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="carga-horaria" className="form-label">Carga Horária</label>
              <div className="input-group">
                <input type="text" id="carga-horaria" className="form-control" value="160h" readOnly />
                <button type="button" className="edit-btn">✎</button>
              </div>
            </div>
          </div>
  
          <div className="mb-3 row">
            <div className="col-md-6">
              <label htmlFor="turma" className="form-label">Turma</label>
              <div className="input-group">
                <select id="turma" className="form-select">
                  <option value="">Selecione a turma</option>
                  <option value="1A">1A</option>
                  <option value="1B">1B</option>
                </select>
                <button type="button" className="edit-btn">✎</button>
              </div>
            </div>
          </div>
  
          <div className="mb-3">
            <label htmlFor="ementa" className="form-label">Ementa</label>
            <textarea id="ementa" className="form-control" rows="4"></textarea>
          </div>
  
          <div className="form-actions">
            <button type="button" className="btn btn-secondary">Voltar</button>
            <button type="submit" className="btn btn-primary">Salvar</button>
          </div>
        </form>
      </div>
    );
  };
  
  export default DisciplinaPage;
  