import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { ConsultaLinea } from './subProduccion/consultaLinea';
import { NoNavega } from './subProduccion/noNavega';

const Produccion = () => {
    // Estado para almacenar todos los mensajes del bot
    const [historialChat, setHistorialChat] = useState([]);
    const [numero, setNum] = useState('');

    const mensajes = [
        { id: 'saludo', message: "¡hola, soy Apyt, tu asistente de procesos!", trigger: "pregunta1" },
        { id: 'pregunta1', message: 'Vamos a iniciar, selecciona el segmento de tu cliente', trigger: "opcionesPregunta1" },
        {
            id: 'opcionesPregunta1',
            options: [
                { value: "1", label: "servicios moviles", trigger: "cargando1" },
                { value: "2", label: "servicios hogar", trigger: "cargando2" },
            ]
        },
        { id: 'cargando1', message: "¿Cuál es el tipo de servicio de tu cliente?", trigger: "opciones2" },
        { id: 'cargando2', message: '¡Perfeto!', trigger: "solicitarNumLinea" },
        {
            id: 'opciones2',
            options: [
                { value: "1", label: "Prepago", trigger: "cargando2" },
                { value: "2", label: "Postpago", trigger: "cargando2" },
            ]
        },
        { id: 'solicitarNumLinea', message: 'Indicame el número de línea', trigger: "capturarLinea" },
        {
            id: 'capturarLinea',
            user: true,
            validator: (value) => {
                if (!isNaN(value)) {
                    setNum(value); // Almacena el valor capturado en numero
                    return true;
                }
                return 'Porfavor ingrese un numero valido'
            },
            trigger: "guardarRespuesta"
        },
        { id: 'guardarRespuesta', message: 'El número que ingresaste es {previousValue}, ¿es correcto?', trigger: "confirmarNumero" },
        {
            id: 'confirmarNumero', options: [
                { value: 'si', label: 'Sí', trigger: 'siRespuesta' },
                { value: 'no', label: 'No', trigger: 'noRespuesta' },
            ]
        },
        { id: 'noRespuesta', message: 'ingrésalo de nuevo', trigger: 'solicitarNumLinea' },
        {
            id: 'siRespuesta',
            component: <ConsultaLinea valor={numero} />,
            asMessage: true,
            trigger: 'respVuelta'
        },
        { id: 'respVuelta', message: 'Dime que novedad presenta la línea', trigger: 'opciones3' },
        {
            id: 'opciones3', options: [
                { value: 'no navega', label: 'No navega', trigger: 'noNavega' },
                { value: 'no genera o recibe llamadas / sms', label: 'No llamadas/sms', trigger: 'noGenera' },
                { value: 'sin señal', label: 'Sin señal', trigger: 'sinSeñal' },
                { value: 'salir', label: 'salir', trigger: 'fin' },

            ]
        },
        { id: 'noNavega', message: "No navega, iniciemos con las verificaciónes.", trigger: "almacenarNumero1" },
        { id: 'noGenera', message: 'No genera ni recibe llamadas o sms, iniciemos con las verificaciónes.', trigger: "opciones3" },
        { id: 'sinSeñal', message: "Sin señal, iniciemos con las verificaciónes.", trigger: "opciones3" },

        /* {
            id: "almacenarNumero1",
            trigger: "conNavega1",
            hideInput: true,
        }, */
        
        {
            id: "almacenarNumero1",
            message: "Validación 1",
            action: () => {
                const dato1 = 1;
                return { dato1 };            
            },            
            trigger: "conNavega2",
        },
        

        
        {
            id: 'conNavega2',
            component: <NoNavega valor={numero} />,
            asMessage: true,
            trigger: 'respVuelta1'
        },

        { id: 'respVuelta1', message: 'aqui vamos', trigger: 'opciones3' },
        { id: 'fin', message: 'Espero haber sido de ayuda', end: true }


    ];



    const handleNewMessage = (newMessage) => {
        setHistorialChat(prevHistorial => [...prevHistorial, newMessage]);
    };

    const theme = {
        background: '#fff0f1',
        fontFamily: "Poppins, sans-serif",
        botFontColor: "white",
        botBubbleColor: "#ff9499",
        userFontColor: "#920a11",
        userBubbleColor: "white",
        headerBgColor: "#b1030c",
        headerFontColor: "white",
        headerFontSize: "20px"
    };

    return (
        <>
            <div style={{ width: 'auto' }}>
                <ThemeProvider theme={theme}>
                    <ChatBot
                        steps={mensajes}
                        headerTitle="Bot APYT"
                        handleEnd={(event) => handleNewMessage(event.values)}
                    />
                    <div>
                        {historialChat.map((mensaje, index) => (
                            <div key={index}>
                                <h1>{mensaje.message}</h1>
                            </div>
                        ))}
                    </div>
                </ThemeProvider>
            </div>
        </>
    );
};

export default Produccion;
