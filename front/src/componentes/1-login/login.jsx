import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import '../../css/login.css';
import LoginForm from './loginForm.jsx';


function Login() {
    const [rol, setRol] = useState('');
    const [modalShow, setModalShow] = React.useState(false);

    const show = (jerarquia) => { setModalShow(true), setRol(jerarquia), console.log(rol) };
    const onHide = () => { setModalShow(false) };

    return (
        <>
            <main className="vh-100">
                <section className="container-fluid full-height-container fondo">
                    <section className='row align-items-center'>
                        <article className='col mt-5 mb-1 text-center'>
                            <h1 className='titleLogin' style={{ color: 'white' }}>Inicio de sesion</h1>
                        </article>
                    </section>
                    <section className='row text-center justify-content-evenly'>
                        <article className='col-auto mt-5'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="../../../pic/Administrador.webp" />
                                <Card.Body>
                                    <Card.Title>Supervisor</Card.Title>
                                    <Button variant="danger" onClick={() => { show(1) }}>Ingresar</Button>
                                </Card.Body>
                            </Card>
                        </article>
                        <article className='col-auto mt-5'>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="../../../pic/Asesor.webp" />
                                <Card.Body>
                                    <Card.Title>Asesor</Card.Title>
                                    <Button variant="danger" onClick={() => { show(2) }}>Ingresar</Button>
                                </Card.Body>
                            </Card>
                        </article>
                    </section>
                    <LoginForm rolUser={rol} abrirModal={modalShow} cerrarModal={onHide} />
                </section>
            </main>
        </>
    );
};

export default Login;
