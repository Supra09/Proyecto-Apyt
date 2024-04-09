import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext.jsx';
import BtnEmpleados from './botonesNav/btnEmpleados.jsx';
import BtnProduccion from './botonesNav/btnProduccion.jsx';
import ListaEmpleados from './contenido menu/listaEmpelados.jsx';
import Produccion from './produccion/produccion.jsx';
import { useEffect, useState } from 'react';

function BarraNav({estado}) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [mostrarListaEmpleados, setMostrarListaEmpleados] = useState(false);
    const [mostrarProduccion, setMostrarProduccion] = useState(false);
    const [mostrarBtnEmpleados, setMostrarBtnEmpleados] = useState(false);

    useEffect(()=>{
        setMostrarBtnEmpleados(estado);
    },[])

    const salir = () => {
        logout();
        navigate('/');
    };

    const mostrarEmpleados = () => {
        if (mostrarListaEmpleados) {
            setMostrarListaEmpleados(false);
        } else {
            setMostrarListaEmpleados(true);
        }
        setMostrarProduccion(false);
    };
    

    const mostrarProduc = () => {
        if (mostrarProduccion) {
            setMostrarProduccion(false);
        } else {
            setMostrarProduccion(true);
        }
        setMostrarListaEmpleados(false);
    };

    return (
        <>
            <header className='px-3 py-2 m-1 d-flex justify-content-between align-items-center fondoDos'>
                <section className='d-flex'>
                    <section className='row-auto pt-2 pb-2'>
                    {mostrarBtnEmpleados && <BtnEmpleados onClick={mostrarEmpleados} />}
                        
                    </section>
                    <section className='row-auto pt-2 pb-2'>
                    <BtnProduccion onClick={mostrarProduc} />
                    </section>
                </section>
                <button className='d-flex justify-content-between align-items-center btnLogout' onClick={salir}>
                    <span className="material-symbols-outlined" style={{ color: 'white' }}>logout</span>
                </button>
            </header>
            <main className='container-fluid px-2 py-2'>
                <section className='row mx-2 my-2 d-flex justify-content-evenly align-items-center'>
                    {mostrarListaEmpleados && <ListaEmpleados />}
                    {mostrarProduccion && <Produccion/>}
                </section>
            </main>
        </>
    )
};

export default BarraNav;
