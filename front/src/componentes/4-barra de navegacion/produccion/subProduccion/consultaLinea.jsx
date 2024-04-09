import axios from "axios";
import React, { useEffect, useState } from "react";

export function ConsultaLinea({ steps }) {
    const [infoCliente, setInfoCliente] = useState([]);

    useEffect(() => {
        consultaLinea();
    }, []);

    const consultaLinea = async () => {
        const linea = steps.capturarLinea.value;
        console.log(`Esta es la linea con la cual se va hacer la consulta: ${linea}`);
        try {
            const response = await axios.get(`http://localhost:3301/cliente/${linea}`);
            if (response.data.mensaje) {
                console.log(response.data.mensaje);
                setInfoCliente([]);
            } else {
                setInfoCliente(response.data.resultados);
                console.log(response.data.resultados);
            }
        } catch (error) {
            console.error("Error en la consulta:", error);
            setInfoCliente([]);
        }
    };

    return (
        <>
            <div>
                {infoCliente.length > 0 ? (
                    <p>
                        Titular de la línea: {infoCliente[0].nombres}, {infoCliente[0].apellidos}
                    </p>
                ) : (
                    <p>No se encontró información para esta línea</p>
                )}
            </div>
        </>
    );
};
