import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext.jsx';
import BtnEmpleados from './botonesNav/btnEmpleados.jsx';
import ListaEmpleados from './contenido menu/listaEmpelados.jsx';
import { useState } from 'react';

function BarraNav() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [mostrarListaEmpleados, setMostrarListaEmpleados] = useState(false);

    const salir = () => {
        logout();
        navigate('/');
    };

    const mostrarEmpleados = () => {
        mostrarListaEmpleados == (true) ? setMostrarListaEmpleados(false) : setMostrarListaEmpleados(true);
    };

    return (
        <>
            <header className='px-3 py-2 m-1 d-flex justify-content-between align-items-center fondoDos'>
                <section className='row-auto pt-2 pb-2'>
                    <BtnEmpleados onClick={mostrarEmpleados} />
                </section>
                <button className='d-flex justify-content-between align-items-center btnLogout' onClick={salir}>
                    <span className="material-symbols-outlined" style={{ color: 'white' }}>logout</span>
                </button>
            </header>
            <main className='container-fluid px-2 py-2'>
                <section className='row mx-2 my-2 d-flex justify-content-evenly align-items-center'>
                    {mostrarListaEmpleados && <ListaEmpleados />}
                </section>
            </main>
        </>
    )
};

export default BarraNav;
