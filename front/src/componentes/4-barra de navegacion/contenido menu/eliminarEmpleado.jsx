import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import Axios from 'axios';

function EliminarEmpleado({ abrirModal, cerrarModal, eliminar, actualizarLista }) {
    const [empleadoInfo, setEmpleadoInfo] = useState(null);

    useEffect(() => {
        if (eliminar) {
            setEmpleadoInfo(eliminar);
        } else {
            setEmpleadoInfo(null);
        }
    }, [eliminar]);

    const eliminarEmpleado = (id) => {
        Axios.delete(`http://localhost:3301/eliminar/${id}`).then(() => {
            Swal.fire("Éxito", "Empleado eliminado con éxito", "success");
            actualizarLista();
            cerrarModal();
        }).catch((error) => {
            Swal.fire("Error", error.response ? error.response.data.mensaje : "No se recibió respuesta del servidor", "error");
            cerrarModal();
        });
    };

    return (
        <Modal className='mt-5' show={abrirModal} onHide={cerrarModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar a {empleadoInfo ? empleadoInfo.usuario : 'empleado'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro de que deseas eliminar {empleadoInfo ? empleadoInfo.usuario : 'este empleado'}?</Modal.Body>
            <Modal.Footer className='row justify-content-around'>
                <Button className='col' variant="danger" onClick={cerrarModal}>
                    Cancelar
                </Button>
                <Button className='col' variant="danger" onClick={() => { eliminarEmpleado(empleadoInfo ? empleadoInfo.id_empleado : ''); }}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EliminarEmpleado;
