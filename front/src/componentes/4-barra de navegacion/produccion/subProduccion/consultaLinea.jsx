import axios from "axios";
import React, { useEffect, useState } from "react";

export function ConsultaLinea({ steps }) {
    const [infoCliente, setInfoCliente] = useState([]);

    useEffect(() => {
        consultaLinea();
    }, []);

    const consultaLinea = async () => {
        const linea = steps.capturarLinea.value;
        console.log(`Esta es la línea con la cual se va a hacer la consulta: ${linea}`);
        try {
            const response = await axios.get(`http://localhost:3301/cliente/${linea}`);
            setInfoCliente(response.data.resultados);
            console.log(response.data.resultados);
        } catch (error) {
            setInfoCliente([]); // Establece infoCliente como un array vacío
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
}
