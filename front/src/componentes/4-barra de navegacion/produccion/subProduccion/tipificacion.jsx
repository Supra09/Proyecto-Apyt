import axios from "axios";
import React, { useEffect, useState } from "react";

export function Tipifica({ consulta }) {
    const [tipificacion, setTipificacion] = useState([]);

    useEffect(() => {
        tipifica();
    }, []);

    const tipifica = async () => {
        const respuesta = consulta
        console.log(`Dato para consultar el tipifica: ${respuesta}`);
        try {
            const response = await axios.get(`http://localhost:3301/tipificacion/${respuesta}`);
            setTipificacion(response.data.resultados);
            console.log(response.data.resultados);
        } catch (error) {
            console.error("Error en la consulta:", error);
            setTipificacion([]);
        }
    };


    return (
        <>
            <div>
                {tipificacion.length > 0 ? (
                    <p>
                        {tipificacion[0].tipificacion}
                    </p>
                ) : (
                    <p>No hay info</p>
                )}
            </div>
        </>
    );
}