import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function CrearEmpleado({ infoEmpleados, empleadoSeleccionado, actualizarLista }) {
    const [jerar, setJerarquia] = useState('');
    const [id, setId] = useState('');
    const [documento, setDocumento] = useState('');
    const [sobreNombre, setSobreNombre] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [repContraseña, setRepContraseña] = useState('');
    const [errorContraseña, setErrorContraseña] = useState('');
    const [errorRepContraseña, setErrorRepContraseña] = useState('');
    const [errorDocumento, setErrorDocumento] = useState('');
    const [errorSobreNombre, setErrorSobreNombre] = useState('');
    const [btones, setBtnes] = useState(true);

    useEffect(() => {
        if (empleadoSeleccionado) {
            setBtnes(false);
            setId(empleadoSeleccionado.id_empleado)
            setJerarquia(empleadoSeleccionado.id_jerarquia);
            setDocumento(empleadoSeleccionado.cedula);
            setSobreNombre(empleadoSeleccionado.usuario);
            setNombres(empleadoSeleccionado.nombres);
            setApellidos(empleadoSeleccionado.apellidos);
        } else {
            setBtnes(true);
            limpiarCampos();
        }
    }, [empleadoSeleccionado]);

    const limpiarCampos = () => {
        setJerarquia('');
        setDocumento('');
        setSobreNombre('');
        setNombres('');
        setApellidos('');
        setContraseña('');
        setRepContraseña('');
        setBtnes(true);
    };

    const validarDocumento = (value) => {
        const documentoExistente = infoEmpleados.some(empleado => empleado.cedula === value);
        if (documentoExistente) {
            setErrorDocumento('Este documento ya está registrado');
        } else {
            setErrorDocumento('');
        }
    };

    const validarSobreNombre = (value) => {
        const sobreNombreExistente = infoEmpleados.some(empleado => empleado.usuario === value);
        if (sobreNombreExistente) {
            setErrorSobreNombre('Este sobrenombre ya está en uso');
        } else {
            setErrorSobreNombre('');
        }
    };

    const handleChangeContraseña = (value) => {
        setContraseña(value);
        if (value === '') {
            setErrorContraseña('');
        }
    };

    const handleChangeRepContraseña = (value) => {
        setRepContraseña(value);
        if (value === '') {
            setErrorRepContraseña('');
        }
    };

    const crearEmpleado = async (e) => {
        e.preventDefault();
        if (errorContraseña || errorRepContraseña || errorDocumento || errorSobreNombre) {
            return;
        }
        if (contraseña !== repContraseña) {
            setErrorContraseña('Las contraseñas no coinciden');
            setErrorRepContraseña('Las contraseñas no coinciden');
            return;
        }
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (!regex.test(contraseña)) {
            setErrorContraseña(`La contraseña debe contener al menos un número, una letra mayúscula 
            y una letra minúscula, y tener entre 6 y 20 caracteres`);
            return;
        }
        try {
            const response = await axios.post('http://localhost:3301/crear', {
                jerarquia: jerar,
                cedula: documento,
                nombres: nombres,
                apellidos: apellidos,
                usuario: sobreNombre,
                password: contraseña
            });
            Swal.fire("Exito", response.data ? response.data.mensaje : "Usuario agregado", "success");
            limpiarCampos();
            actualizarLista();
        } catch (error) {
            Swal.fire("Error", error.response ? error.response.data.mensaje : "No se recibió respuesta del servidor", "error");
        }
    };

    const editEmpleado = async (e) => {
        e.preventDefault();
    
        if (errorContraseña || errorRepContraseña) {
            return;
        }
    
        if (contraseña.trim() !== '') {
            const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if (!regex.test(contraseña)) {
                setErrorContraseña(`La contraseña debe contener al menos un número, una letra mayúscula 
                y una letra minúscula, y tener entre 6 y 20 caracteres`);
                return;
            }
        }
    
        if (contraseña !== repContraseña) {
            setErrorContraseña('Las contraseñas no coinciden');
            setErrorRepContraseña('Las contraseñas no coinciden');
            return;
        }
    
        try {
            const response = await axios.put('http://localhost:3301/actualizar', {
                id: id,
                jerarquia: jerar,
                cedula: documento,
                nombres: nombres,
                apellidos: apellidos,
                usuario: sobreNombre,
                password: contraseña
            });
            Swal.fire("Exito", response.data ? response.data.mensaje : "Usuario agregado", "success");
            limpiarCampos();
            actualizarLista();
        } catch (error) {
            Swal.fire("Error", error.response ? error.response.data.mensaje : "No se recibió respuesta del servidor", "error");
        }
    };
    

    return (
        <section className="container">
            <form onSubmit={btones ? crearEmpleado : editEmpleado}>
                <section className="row mb-3">
                    <article className="col">
                        <select className="form-select" value={jerar} onChange={(event) => { setJerarquia(event.target.value) }} required>
                            <option value='' hidden>Seleccionar opción</option>
                            <option value={1} >Supervisor</option>
                            <option value={2} >Asesor</option>
                        </select>
                    </article>
                    <article className="col">
                        <input type="number" className={`form-control ${errorDocumento ? 'is-invalid' : ''}`} placeholder="Documento"
                            value={documento} onChange={(e) => { setDocumento(e.target.value); validarDocumento(e.target.value); }} required />
                    </article>
                    <article className="col">
                        <input type="text" className={`form-control ${errorSobreNombre ? 'is-invalid' : ''}`} placeholder="SobreNombre"
                            value={sobreNombre} onChange={(e) => { setSobreNombre(e.target.value); validarSobreNombre(e.target.value); }} required />
                    </article>
                </section>
                <section className="row mb-3">
                    <article className="col">
                        <input type="text" className={`form-control`} placeholder="Nombres"
                            value={nombres} onChange={(e) => setNombres(e.target.value)} required />
                    </article>
                    <article className="col">
                        <input type="text" className={`form-control`} placeholder="Apellidos"
                            value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                    </article>
                </section>
                <section className="row mb-3">
                    <article className="col">
                        <input type="password" className={`form-control ${errorContraseña ? 'is-invalid' : ''}`} placeholder="Contraseña"
                            value={contraseña} onChange={(e) => handleChangeContraseña(e.target.value)}  {...(btones ? { required: true } : {})} />
                    </article>
                    <article className="col">
                        <input type="password" className={`form-control ${errorRepContraseña ? 'is-invalid' : ''}`} placeholder="Repetir Contraseña"
                            value={repContraseña} onChange={(e) => handleChangeRepContraseña(e.target.value)}  {...(btones ? { required: true } : {})} />
                    </article>
                </section>
                <section className="row">
                    <div className="col">
                        {errorContraseña && <div className="alert alert-danger" role="alert">{errorContraseña}</div>}
                        {errorSobreNombre && <div className="alert alert-danger" role="alert">{errorSobreNombre}</div>}
                        {errorDocumento && <div className="alert alert-danger" role="alert">{errorDocumento}</div>}
                    </div>
                </section>
                <section className="row">
                    <article className="col">
                        {btones ?
                            <button type="submit" className="btn btn-danger w-100"> <strong>Agregar Empleado</strong> </button> :
                            <div className="d-flex">
                                <button type="submit" className="btn btn-danger col mx-1"> <strong>Editar Empleado</strong> </button>
                                <button type="button" className="btn btn-danger col mx-1" onClick={limpiarCampos}> <strong>Cancelar</strong> </button>
                            </div>
                        }
                    </article>
                </section>
            </form>
        </section>
    );
}

export default CrearEmpleado;
