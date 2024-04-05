import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Produccion() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [messageId, setMessageId] = useState(0); // Variable de estado para mantener un contador de IDs de mensaje
    const [pasoSig, setPasoSig] = useState(false);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            sendMessage('Hola Orlando');
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            sendMessage('Soy tu asistente de procesos');
        }, 1200);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            sendMessage('¿La línea de tu cliente es?');
        }, 2200);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            sendMessage('Envia 1 para prepago y 2 para postpago');
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const sendMessageU = () => {
        if (inputValue.trim() !== '') {
            const newMessage = {
                id: messageId,
                text: inputValue,
                sender: 'user'
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInputValue('');
            setMessageId((prevId) => prevId + 1); // Incrementa el contador de IDs de mensaje

            // Maneja la respuesta del usuario según la opción seleccionada
            if (inputValue === '1') {
                sendMessage(`Tu línea es prepago.`, messageId + 1);
                setTimeout(() => {
                    sendMessage(`Ingresa el numero de linea del cliente.`, messageId + 1);
                }, 1000);
                setPasoSig(true);
                return;
            } else if (inputValue === '2') {
                sendMessage(`Tu línea es postpago.`, messageId + 1);
                return;
            } else if (pasoSig == true) {
                if (inputValue != '') {
                    sendMessage(`tu cliente es ${clientes.nombres}`, messageId + 1);
                }
                return;
            }
            else {
                sendMessage(`Por favor, selecciona una opción válida (1 o 2).`, messageId + 1);
            }
        }
    };

    const sendMessage = (messageText, id) => {
        if (messageText.trim() !== '') {
            const newMessage = {
                id: id,
                text: messageText,
                sender: 'bot'
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
    };

    const consultaLinea = async (id) => {
        const response = await axios.get(`http://localhost:3301//cliente/${id}`).then(() => {
            setClientes(response.data);
            Swal.fire("Éxito", "Cliente encontrado con éxito", "success");
            console.log(clientes);
        }).catch((error) => {
            Swal.fire("Error", error.response ? error.response.data.mensaje : "No se recibió respuesta del servidor", "error");
            console.log(clientes);
        });
    };

    return (
        <div>
            <div className="row text-center">
                <h1 className='titleChatBot'>ChatBot</h1>
            </div>
            <div className='p-2' style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
                {messages.map((message) => (
                    <div className='pt-2' key={message.id} style={{ padding: '5px', textAlign: message.sender === 'user' ? 'right' : 'left' }}>
                        <span style={{ backgroundColor: message.sender === 'user' ? '#DCF8C6' : '#ff5760', padding: '5px 10px', borderRadius: '10px' }}>{message.text}</span>
                    </div>
                ))}
            </div>
            <input type="number" className='px-2' value={inputValue} onChange={handleInputChange} style={{ width: '100%', marginBottom: '10px' }} />
            <button className='btn btn-danger w-100' onClick={sendMessageU}>Enviar</button>
        </div>
    );
}

export default Produccion;

