import axios from "axios";
import React, { useEffect, useState } from "react";

export function Procesos({ consulta }) {
    const [procesosUno, setProcesosUno] = useState([]);

    useEffect(() => {   
        procesos();
    }, []);

    const procesos = async () => {
        const respuesta = consulta
        console.log(`Dato para consultar el procesos: ${respuesta}`);
        try {
            const response = await axios.get(`http://localhost:3301/procesos/${respuesta}`);
            setProcesosUno(response.data.resultados);
            console.log(response.data.resultados);
        } catch (error) {
            console.error("Error en la consulta:", error);
            setProcesosUno([]);
        }
    };


    return (
        <>
            <div>
                {procesosUno.length > 0 ? (
                    <p>
                        {procesosUno[0].proceso}
                    </p>
                ) : (
                    <p>No hay info</p>
                )}
            </div>
        </>
    );
}