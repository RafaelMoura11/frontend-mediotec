import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';  // Importação do Bootstrap Icons
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import imageLogin from '../../images/imageLogin.png';

function LoginPage() {
    const [userType, setUserType] = useState('Coordenador');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='login-page-main'>
            <div className="login-page d-flex align-items-center">
                <div className="image-section">
                    <img src={imageLogin} alt="Login Illustration" className="img-fluid" />
                </div>
                <div className="form-section d-flex flex-column justify-content-center">
                    <h2 className="text-center mb-4 h2-login">Login</h2>

                    <Form className="login-form">
                        {/* User Type */}
                        <Form.Group className="mb-4">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="bi bi-person"></i>
                                </InputGroup.Text>
                                <Form.Select
                                    aria-label="Selecione o tipo de usuário"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                >
                                    <option value="Coordenador">Coordenador</option>
                                    <option value="Professor">Professor</option>
                                    <option value="Aluno">Aluno</option>
                                </Form.Select>
                            </InputGroup>
                        </Form.Group>

                        {/* Email */}
                        <Form.Group className="mb-4">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="bi bi-envelope"></i>
                                </InputGroup.Text>
                                <FormControl
                                    type="email"
                                    placeholder="seuemail@pe.edu.senac.br"
                                    aria-label="Email"
                                />
                            </InputGroup>
                        </Form.Group>

                        {/* Password */}
                        <Form.Group className="mb-4">
                            <InputGroup>
                                <InputGroup.Text>
                                    <i className="bi bi-lock"></i>
                                </InputGroup.Text>
                                <FormControl
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Senha"
                                    aria-label="Senha"
                                />
                                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                    <i className="bi bi-eye"></i>
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>

                        {/* Submit Button */}
                        <div className="d-flex justify-content-center">
                            <NavLink to="/">
                                <Button variant="primary" type="button" className="btn btn-primary btn-lg btn-login">
                                    Entrar
                                </Button>
                            </NavLink>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
