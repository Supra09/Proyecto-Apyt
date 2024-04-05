import express from "express";
const produccion = express();

produccion.get("/cliente/:id", (req, res) => {
    const celular = req.params.id;     
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
                return res.status(404).json({ error: "Cliente no encontrado" });
            }           
            res.status(200).json({ mensaje: 'Cliente encontrado', resultados });
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