import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../../components/navBar';

function ConceptTable() {
    const [students, setStudents] = useState([
        { name: 'Cristina', unit1: '', unit2: '', rec: '', media: '', status: '', recDisabled: false },
        { name: 'Lucas', unit1: '', unit2: '', rec: '', media: '', status: '', recDisabled: false },
        { name: 'Maria', unit1: '', unit2: '', rec: '', media: '', status: '', recDisabled: false },
        { name: 'Joao', unit1: '', unit2: '', rec: '', media: '', status: '', recDisabled: false },
        { name: 'Fabricio', unit1: '', unit2: '', rec: '', media: '', status: '', recDisabled: false },
        { name: 'Felipe', unit1: '', unit2: '', rec: '', media: '', status: '', recDisabled: false },
        { name: 'Julia', unit1: '', unit2: '', rec: '', media: '', status: '', recDisabled: false }
    ]);

    const conceptValues = ['EX', 'OT', 'B', 'ANS', 'I'];

    // Função para calcular a média e a situação com base nas notas
    const calculateMediaAndStatus = (student) => {
        let points = 0;
        let media = '';
        let status = '';
        let recDisabled = false;

        // 1. Se as notas da 1ª e 2ª unidade forem "ANS" e a recuperação estiver vazia
        if (student.unit1 === 'ANS' && student.unit2 === 'ANS' && !student.rec) {
            status = 'Em Recuperação';
            return { media: '', status, recDisabled: false }; // Não calcular a média, campo rec ativo
        }

        // 2. Calcula a média das 1ª e 2ª unidades
        const unitValues = [student.unit1, student.unit2].filter(v => v !== '').map(v => {
            switch (v) {
                case 'EX': return 10;
                case 'OT': return 8;
                case 'B': return 7;
                case 'ANS': return 6;
                case 'I': return 4;
                default: return 0;
            }
        });

        // Verifica se há valores nas 1ª e 2ª unidades
        if (unitValues.length === 2) {
            const unitMedia = (unitValues[0] + unitValues[1]) / 2;

            // 3. Se a média das 1ª e 2ª unidades for suficiente para aprovação
            if (unitMedia >= 7) {
                media = unitMedia.toFixed(2); // Média entre as duas unidades
                status = 'Aprovado';
                recDisabled = true; // Desativa o campo de recuperação
                return { media, status, recDisabled };
            }
        }

        // 4. Caso contrário, calcula a média levando em consideração a recuperação
        const values = [student.unit1, student.unit2, student.rec].filter(v => v !== '').map(v => {
            switch (v) {
                case 'EX': return 10;
                case 'OT': return 9;
                case 'B': return 8;
                case 'ANS': return 6;
                case 'I': return 3;
                default: return 0;
            }
        });

        if (values.length > 0) {
            points = values.reduce((a, b) => a + b, 0) / values.length;
            media = points.toFixed(2); // Calcula a média
        }

        // 5. Define a situação com base na média
        if (media >= 7) {
            status = 'Aprovado';
        } else if (media >= 4) {
            status = 'Em Recuperação';
        } else {
            status = 'Reprovado';
        }

        return { media, status, recDisabled };
    };

    // Handle change in concepts
    const handleConceptChange = (index, field, value) => {
        const updatedStudents = [...students];
        updatedStudents[index][field] = value;

        const { media, status, recDisabled } = calculateMediaAndStatus(updatedStudents[index]);
        updatedStudents[index].media = media;
        updatedStudents[index].status = status;
        updatedStudents[index].recDisabled = recDisabled;

        // Limpar campo de recuperação se desativado
        if (recDisabled) {
            updatedStudents[index].rec = ''; // Limpa o campo rec se a média entre as unidades for suficiente
        }

        setStudents(updatedStudents);
    };

    const handleSave = () => {
        console.log('Dados salvos:', students);
        // Aqui você faria uma requisição para salvar os dados no backend
    };

    const handleBack = () => {
        console.log('Voltar para a página anterior');
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='titulo'>Conceitos</h1>

                        <div className="d-flex justify-content-between">
                            <h1 className="titulo">Português 1A 2024</h1>
                            <div>
                                <p>Excelente: EX</p>
                                <p>Ótimo: OT</p>
                                <p>Bom: B</p>
                                <p>Ainda Não Suficiente: ANS</p>
                                <p>Insuficiente: I</p>
                            </div>
                        </div>

                        <table className="table table-bordered mt-4">
                            <thead className="bg-light">
                                <tr>
                                    <th>Alunos</th>
                                    <th>1 Unid</th>
                                    <th>2 Unid</th>
                                    <th>Rec</th>
                                    <th>Média</th>
                                    <th>Situação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.name}</td>
                                        <td>
                                            <select
                                                value={student.unit1}
                                                onChange={(e) => handleConceptChange(index, 'unit1', e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="">Selecione</option>
                                                {conceptValues.map((val, idx) => (
                                                    <option key={idx} value={val}>{val}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={student.unit2}
                                                onChange={(e) => handleConceptChange(index, 'unit2', e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="">Selecione</option>
                                                {conceptValues.map((val, idx) => (
                                                    <option key={idx} value={val}>{val}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={student.rec}
                                                onChange={(e) => handleConceptChange(index, 'rec', e.target.value)}
                                                className="form-select"
                                                disabled={student.recDisabled} // Desativa o campo de recuperação quando necessário
                                            >
                                                <option value="">Selecione</option>
                                                {conceptValues.map((val, idx) => (
                                                    <option key={idx} value={val}>{val}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>{student.media}</td>
                                        <td>{student.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="d-flex justify-content-end mt-4">
                            <button className="btn btn-success me-3" onClick={handleSave}>Salvar</button>
                            <button className="btn btn-secondary" onClick={handleBack}>Voltar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConceptTable;
