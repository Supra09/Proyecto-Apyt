import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CrearEmpleado from "./crearEmpleado.jsx";
import EliminarEmpleado from "./eliminarEmpleado.jsx";

function ListaEmpleados() {
    const [listaEmpleados, setListaEmpleados] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
    const [eliminar, setEliminar] = useState(null);
    const [show, setShow] = useState(false);

    const handleShow = () => { setShow(true); }
    const closeShow = () => { setShow(false); }

    useEffect(() => {
        listarEmpleados();
    }, []);

    const listarEmpleados = async () => {
        try {
            const response = await axios.get('http://localhost:3301/listar');
            setListaEmpleados(response.data);
        } catch (error) {
            Swal.fire("Error", error.response ? error.response.data.mensaje : "No se recibió respuesta del servidor", "error");
        }
    };

    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value);
    };

    const handleEditarEmpleado = (idEmpleado) => {
        const infoEmpl = idEmpleado
        let empleado
        for (let i = 0; i < listaEmpleados.length; i++) {
            if (listaEmpleados[i].id_empleado === infoEmpl) {
                empleado = listaEmpleados[i];
            }
        }
        setEmpleadoSeleccionado(empleado);
        console.log(empleado);
    };

    const handleEliminarEmpleado = (idEmpleado) => {
        handleShow();
        const id_emp = idEmpleado
        let empleado
        for (let i = 0; i < listaEmpleados.length; i++) {
            if (listaEmpleados[i].id_empleado === id_emp) {
                empleado = listaEmpleados[i];
            }
        }
        setEliminar(empleado);
        console.log(empleado); 
    }
    

    const filteredEmpleados = listaEmpleados.filter(empleado => {
        return (
            empleado.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
            empleado.jerarquia.toLowerCase().includes(busqueda.toLowerCase()) ||
            empleado.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
            empleado.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
            empleado.cedula.toLowerCase().includes(busqueda.toLowerCase())
        );
    });

    return (
        <section className="container">
            <div className="row">
                <div className="col-md-6 mt-5">
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Buscar..." value={busqueda} onChange={handleBusquedaChange} />
                    </div>
                    <div className="table-responsive">
                        <table className="table mb-1 text-center">
                            <thead className="table-danger">
                                <tr>
                                    <th className="col">Jerarquia</th>
                                    <th className='col'>Usuario</th>
                                    <th className='col'>Nombres</th>
                                    <th className='col'>Apellidos</th>
                                    <th className='col'>Documento</th>
                                    <th className='col'>Gestion</th>
                                </tr>
                            </thead>
                            <tbody className="styled-table">
                                {filteredEmpleados.map((empleado, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
                                        <td className="col">{empleado.jerarquia}</td>
                                        <td className='col'>{empleado.usuario}</td>
                                        <td className='col text-start'>{empleado.nombres}</td>
                                        <td className='col text-start'>{empleado.apellidos}</td>
                                        <td className='col'>{empleado.cedula}</td>
                                        <td className='col'>
                                            <span className="material-symbols-outlined btnPerson" onClick={() => handleEditarEmpleado(empleado.id_empleado)}>person_edit</span>
                                            <span className="material-symbols-outlined btnPerson" onClick={() => handleEliminarEmpleado(empleado.id_empleado)}>delete_sweep</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-6 mt-5">
                    <CrearEmpleado infoEmpleados={listaEmpleados} empleadoSeleccionado={empleadoSeleccionado} actualizarLista={listarEmpleados} />
                    <EliminarEmpleado abrirModal={show} cerrarModal={closeShow} eliminar={eliminar} actualizarLista={listarEmpleados}/>
                </div>
            </div>
        </section>
    );
}

export default ListaEmpleados;
