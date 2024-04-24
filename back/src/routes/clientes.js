
import express from "express";

const clientes = express.Router();

clientes.get("/listarClientes", (req, res) => {
    const consulta = `SELECT * FROM clientes`
    req.getConnection((error, conexion) => {
        if (error) return res.send(error);
        conexion.query(consulta, (err, respuestaclientes) => {
            if (err) return (
                res.send(err),
                console.log("Error de consulta de cliente")
            )
            res.json(respuestaclientes);
        });
    })
})

clientes.post("/crearClientes", async (req, res) => {
    const id_cliente = (req.body.id_cliente);
    const id_servicio = (req.body.id_servicio);
    const contrato_linea = (req.body.contrato_linea);
    const nombres = (req.body.nombres);
    const apellidos = (req.body.apellidos);
    const consulta = `INSERT INTO clientes 
    (id_cliente,id_servicio,contrato_linea,nombres,apellidos)
    VALUES (?,?,?,?,?)`;

    req.getConnection((errors, conexion) => {
        if (errors) return res.status(500).json({ errors: 'error al conectarse con la base de datos' });
        conexion.query(consulta, [id_cliente, id_servicio, contrato_linea, nombres, apellidos], (err, respuesta) => {
            if (err) return res.status(400).json({ err: 'error al realizar la consulta' });
            res.status(200).json({ mensaje: 'cliente agregado exitosamente', respuesta });
        });
    });
});

clientes.delete("/eliminar/:id", (req, res) => {
    const id = parseInt(req.params.id);

    req.getConnection((err, conexion) => {
        if (err) return res.status(500).json({err: 'fallo conexion con db', err})
        conexion.query("DELETE FROM clientes WHERE id_cliente = ?", 
        [id], (err,respuesta) => {
            if (err) return res.status(400).json({err:'fallo en la consulta',err});
            res.status(200).json({mensaje: 'cliente eliminado satisfactoriamente'});
        });
    });
});



clientes.put("/:id", (req, res) => {
    req.getConnection((error, conexion) => {
        if (error) return res.send(error)
        conexion.query("UPDATE clientes  SET ? WHERE id_cliente = ? ",
            [req.body, req.params.id], (err, lista) => {
                if (err) return (res.send(err),
                    console.log("error de conexion")

                )
                res.json("<h2>el cliente ha sido atualizado </h2>");
            });
    });
});

export default clientes;