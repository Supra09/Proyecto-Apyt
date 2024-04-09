import axios from "axios";
import React, { useEffect, useState } from "react";

export function NoNavega({consulta}) {
    const [consultaNavega, setconsultaNavega] = useState([]);

    useEffect(() => {
        noNavega();
    }, []);

    const noNavega = async () => {
        const dato1 = consulta
        console.log(`Dato para consultar el no navega: ${dato1}`);
        try {
            const response = await axios.get(`http://localhost:3301/noNavega/${dato1}`);
            setconsultaNavega(response.data.resultados);
            console.log(response.data.resultados);
        } catch (error) {
            console.error("Error en la consulta:", error);
            setconsultaNavega([]);
        }
    };


    return (
        <>
            <div>
                {consultaNavega.length > 0 ? (
                    <p>
                        {consultaNavega[0].consulta}
                    </p>
                ) : (
                    <p>No hay info</p>
                )}
            </div>
        </>
    );
}