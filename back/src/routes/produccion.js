import express from "express";
const produccion = express();

produccion.get("/cliente/:linea", (req, res) => {
    const celular = req.params.linea;     
    req.getConnection((error, conexion) => {
        if (error) {
            console.error('Error de conexión:', error);
            return res.status(500).json({ error: "No hay conexión con el servidor" });
        }
        conexion.query("SELECT * FROM clientes WHERE contrato_linea = ?", celular, (err, resultados) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(400).json({ error: "No se realizó la consulta" });
            }          
            if (resultados.length === 0) {
                return res.status(200).json({ mensaje: "Cliente no encontrado" });
            }           
            res.status(200).json({ mensaje: 'Cliente encontrado', resultados });
        });
    });
});

produccion.get("/noNavega/:dato1", (req, res) => {
    const consulta1 = req.params.dato1;     
    req.getConnection((error, conexion) => {
        if (error) {
            console.error('Error de conexión:', error);
            return res.status(500).json({ error: "No hay conexión con el servidor" });
        }
        conexion.query("SELECT * FROM consultas WHERE id_consulta = ?", consulta1, (err, resultados) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(400).json({ error: "No se realizó la consulta" });
            }          
            if (resultados.length === 0) {
                return res.status(404).json({ error: "consultaNav no encontrado" });
            }           
            res.status(200).json({ mensaje: 'Consulta exitosa', resultados });
        });
    });
});

produccion.get("/tipificacion/:respuesta", (req, res) => {
    const tipificacion1 = req.params.respuesta;     
    req.getConnection((error, conexion) => {
        if (error) {
            console.error('Error de conexión:', error);
            return res.status(500).json({ error: "No hay conexión con el servidor" });
        }
        conexion.query("SELECT * FROM tipificaciones WHERE id_tipificacion = ?", tipificacion1, (err, resultados) => {
            if (err) {
                console.error('Error en la tipificacion:', err);
                return res.status(400).json({ error: "No se realizó la consulta" });
            }          
            if (resultados.length === 0) {
                return res.status(404).json({ error: "tipificacionNav no encontrado" });
            }           
            res.status(200).json({ mensaje: 'tipificacion exitosa', resultados });
        });
    });
});

produccion.get("/procesos/:proceso", (req, res) => {
    const proceso1 = req.params.proceso;     
    req.getConnection((error, conexion) => {
        if (error) {
            console.error('Error de conexión:', error);
            return res.status(500).json({ error: "No hay conexión con el servidor" });
        }
        conexion.query("SELECT * FROM procesos WHERE id_proceso = ?", proceso1, (err, resultados) => {
            if (err) {
                console.error('Error en la tipificacion:', err);
                return res.status(400).json({ error: "No se realizó la consulta" });
            }          
            if (resultados.length === 0) {
                return res.status(404).json({ error: "tipificacionNav no encontrado" });
            }           
            res.status(200).json({ mensaje: 'tipificacion exitosa', resultados });
        });
    });
});

produccion.post("/crear_cliente", async (req, res) => {
    const id_servicio = parseInt(req.body.id_servicio);
    const nombres = String(req.body.nombres);
    const apellidos = String(req.body.apellidos);
    const contrato_linea = String(req.body.contrato_linea);
    const consulta = "INSERT INTO clientes (id_servicio,nombres,apellidos,contrato_linea) VALUES (?,?,?,?)"
    req.getConnection((error, conexion) => {
        if (error) {
            res.status(500).json({
                error: "error inicio"
            });
        }
        conexion.query(consulta, [id_servicio, nombres, apellidos, contrato_linea], (err, resultado) => {
            if (err) {
                res.status(400).json({
                    err: "error ingreso de datos cliente"
                });
            }
            res.send(resultado);
        });
    });
});


export default produccion;