import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext.jsx';

function LoginForm({ abrirModal, cerrarModal, rolUser }) {
    const [rol, setRol] = useState(''); 
    const [usaurio,setUsuario] = useState('');
    const [documento,setDocumento] = useState('');
    const [password,setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setRol(rolUser);
    }, [rolUser]); 

    const tipoUser = () => {
        if (rol == '1') {
            return { roleName: 'Supervisor', imgSrc: "../../../pic/Administrador.webp" };
        } else {
            return { roleName: 'Asesor', imgSrc: "../../../pic/Asesor.webp" };
        }
    };
    const { roleName, imgSrc } = tipoUser();

    const logear = (evento) =>{
        evento.preventDefault();
        axios.post('http://localhost:3301/login',{
            jerarquia: rol,
            usuario: usaurio,
            documento: documento,
            password: password
        }).then(response =>{
            console.log(response.data.mensaje);
            login();
            navigate(`/${roleName}`)
        }).catch(error=>{
            const err = error.response.data.mensaje;
            Swal.fire({
                title: 'Error',
                text: err,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }); 
    };
    return (
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={abrirModal} onHide={cerrarModal}>
            <Form onSubmit={logear}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {roleName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className='row align-items-center justify-content-center rounded p-3 formLogin'>
                        <article className='col-auto'>
                            <Form.Group className="mb-3" controlId="formBasicUser">
                                <Form.Label>Sobre Nombre</Form.Label>
                                <Form.Control type="text" required  onChange={(event) => { setUsuario(event.target.value)}}/>
                                <Form.Text className="text-muted">
                                    Por favor ingrese su sobre Nombre.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDocument">
                                <Form.Label>Documento</Form.Label>
                                <Form.Control type="number" required onChange={(event) => { setDocumento(event.target.value)}}/>
                                <Form.Text className="text-muted">
                                    Por favor ingrese su documento.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" required  onChange={(event) => { setPassword(event.target.value)}}/>
                            </Form.Group>
                        </article>
                        <article className='col-auto'>
                            <img src={imgSrc} alt={roleName} className='imgLogin rounded' />
                        </article>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" style={{ width: '100%' }}>Ingresar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default LoginForm;
