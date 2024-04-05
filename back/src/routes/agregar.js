import express from "express";
import bcrypt from "bcryptjs";

const agregar = express.Router();

/** 
* @swagger
* components:
*    schemas:
*        empleados:
*            type: object
*            properties:
*                id_empleado:
*                    type: integer
*                    description: Id autogenerado en la base de datos
*                id_jerarquia:
*                    type: codigo que define el tipo de empleado
*                    description: nombre del producto
*                nombres:
*                    type: string
*                    description: nombre del estudiante en la base de datos llamada escuela
*                apellido:
*                    type: string
*                    description: tapellido del estudiante en la base de datos llamada escuela
*                usuario: 
*                    type: string
*                    description: usuario asignado por el supervisor para ingreso a la app 
*                password: 
*                    type: string
*                    description: contraseña de ingreso a la app                
*            required:
*                -   id_empleado
*                -   id_jerarquia
*                -   nombres
*                -   apellido
*                -   usuario  
*            example:
*                id_empleado: 1
*                id_jerearquia: 1
*                nombres: Orlando
*                apellido: Parada Suarez
*                password: Orlan234
*/



/**
 * @swagger
 * /listar:
 *   get:
 *     summary: Retorna los registros en los empleados 
 *     tags: [empleados]
 *     description: Consulta de los empleados
 *     responses:
 *       200:
 *         description: Trae la lista de todos los empleados con sus propiedades.
 *       400:
 *         description: Error al consultar en la base de datos.
 *       500:
 *         description: Error en conexión con la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: "#/components/schemas/empleados"
 */



agregar.get("/listar", (req, res) => {
    const consulta = `
    SELECT e.*,j.jerarquia
    FROM empleados e
    INNER JOIN
    jerarquia j ON e.id_jerarquia = j.id_jerarquia
    `
    req.getConnection((error, conexion) => {
        if (error) return res.send(error);
        conexion.query(consulta, (err, respuestaEmpleados) => {
            if (err) return (
                res.send(err),
                console.log("Error de consulta de empleados")
            )
            res.json(respuestaEmpleados);
        });
    })
})


/**
 * @swagger
 * /crear:
 *   post:
 *     summary: Rigistra los nuevos empleados a la conexion
 *     tags: [empleados]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/empleados"
 *     responses:
 *       200:
 *         description: Trae la lista de todos los empleados con sus propiedades.
 *       400:
 *         description: Error al consultar en la base de datos.
 *       500:
 *         description: Error en conexión con la base de datos.      
 */

agregar.post("/crear", async (req, res) => {
    const jerarquia = parseInt(req.body.jerarquia);
    const cedula = (req.body.cedula);
    const nombres = (req.body.nombres);
    const apellidos = (req.body.apellidos);
    const usuario = (req.body.usuario);
    const password = (req.body.password);
    const encriptar = await bcrypt.hash(password, 7);
    const consulta = `INSERT INTO empleados 
    (id_jerarquia,cedula,nombres,apellidos,usuario,password)
    VALUES (?,?,?,?,?,?)`;

    req.getConnection((errors, conexion) => {
        if (errors) return res.status(500).json({ errors: 'error al conectarse con la base de datos' });
        conexion.query(consulta, [jerarquia, cedula, nombres, apellidos, usuario, encriptar], (err, respuesta) => {
            if (err) return res.status(400).json({ err: 'error al realizar la consulta' });
            res.status(200).json({mensaje:'Usuario agregado exitosamente', respuesta});
        });
    });
});


/* agregar.put("/actualizar/:id", async (req, res) => {
    const jerarquia = parseInt(req.body.jerarquia);
    const nombres = String(req.body.nombres);
    const apellidos = String(req.body.apellidos);
    const usuario = String(req.body.usuario);
    const password = String(req.body.password);
    const encriptar = await bcrypt.hash(password, 7);
    const consulta = "UPDATE empleados SET ? WHERE id_empleado = ?"
    req.getConnection((error, conexion) => {
        if (error) {
            res.status(500).json({
                error: "Culpa de RAULITO"
            });
        }
        conexion.query(consulta, [req.body, req.params.id], [jerarquia, nombres, apellidos, usuario, encriptar], (err, resultado) => {
            if (err) {
                res.status(400).json({
                    err: "error en captura de datos"
                });
            }
            res.send(resultado);
        });
    });
}); */


/**
 * @swagger
 * /actualizar/{id}:
 *   put:
 *     summary: Atualiza el registro de los empleados
 *     tags: [empleados]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: codigo del registro a atualizar
 *         schema:
 *          type: integer
 *         requered: true
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/empleados"
 *     responses:
 *       200:
 *         description: Trae la lista de todos los empleados con sus propiedades.
 *       400:
 *         description: Error al consultar en la base de datos.
 *       500:
 *         description: Error en conexión con la base de datos.      
 */


agregar.put("/actualizar/:id", (req, res) => {
    req.getConnection((falla, conexion) => {
        if (falla) return (res.status(500).json({ error: "No hay conexión con el servidor" }),
            console.info("error en la conexión conslta"));
        conexion.query("UPDATE empleados SET ? WHERE id_empleado = ?",
            [req.body, req.params.id], (err, actualiza) => {
                if (err) return (res.status(400).json({ error: "no se realizó la consulta" }),
                    console.info("error en la consulta"));
                res.status(200).json({ mensaje: actualiza });
            });

    });
});



/**
 * @swagger
 * /eliminar/{id}:
 *   delete:
 *     summary: Elimina el registro de los empleados
 *     tags: [empleados]
 *     parameters:
 *       - in : path
 *         name: id_empleado
 *         description: codigo del registro a eliminar
 *         schema:
 *          type: integer
 *         requered: true
 *     responses:
 *       200:
 *         description:  Registro eliminado del empleado en la BdD.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/empleados"     
 *       400:
 *         description: Error al consultar en la base de datos.
 *       500:
 *         description: Error en conexión con la base de datos.      
 */

agregar.delete("/eliminar/:id", (req, res) => {
    req.getConnection((falla, conexion) => {
        if (falla) return (res.status(500).json({ error: "No hay conexión con el servidor" }),
            console.info("error en la conexión conslta"));
        conexion.query("DELETE FROM empleados WHERE id_empleado = ?",
            [req.params.id], (err, borra) => {
                if (err) return (res.status(400).json({ error: "no se realizó la consulta" }),
                    console.info("error en la consulta"));
                res.status(200).json({ mensaje: borra });
            });

    });
});

export default agregar;