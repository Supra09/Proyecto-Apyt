import express from "express";
import bcrypt from "bcryptjs";

const login = express.Router();

/** 
* @swagger
* components:
*    schemas:
*        empleados:
*            type: object
*            properties:
*                id_empleado:
*                    type: integer
*                    description: id asignado automaticamente por la base
*                id_jerarquia:
*                    type: codigo que define el tipo de empleado
*                    description: nombre del producto
*                nombres:
*                    type: string
*                    description: nombre del empleado
*                apellidos: 
*                    type: string
*                    description: apellidos del empleado
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
*                -   apellidos 
*                -   usuario
*                -   password 
*            example:
*                id_empleado: 2343
*                id_gerarquia: 1
*                nombres: Orlando 
*                apellidos: Parada Suarez
*                usuario: Orlan
*                password: Orlan234
*/

/**
 * @swagger
 * /a/login:
 *   post:
 *     summary: login de usuarios
 *     tags: [empleados]    
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/empleados"
 *     responses:
 *       200:
 *         description: Bienvenido
 *       400:
 *         description: Error al consultar en la base de datos.
 *       401:
 *         description: credenciales incorrectas.
 *       500:
 *         description: Error en conexión con la base de datos.      
 */


login.post("/login", (req, res) => {
    const jerarquia = (req.body.jerarquia);
    const usuario = (req.body.usuario);
    const cedula = (req.body.documento);
    const password = String(req.body.password);
    const consulta = `SELECT * FROM empleados 
        WHERE  id_jerarquia = ? AND  usuario = ? AND cedula = ? `;

    req.getConnection((errors, conexion) => {
        if (errors) return res.status(500).json({ errors: 'Error en laconexion con la base de datos' });

        conexion.query(consulta, [jerarquia, usuario, cedula], (err, respuesta) => {
            if (err) return res.status(400).json({ err: 'Error en la consulta' });

            if (respuesta.length > 0) {
                const compararContra = bcrypt.compareSync(password, respuesta[0].password);
                if (compararContra) {
                    return res.status(200).json({ mensaje: 'bienvenido' });
                }
                else{
                    return res.status(401).json({mensaje: 'Jerarquia, cedula, usuario o contraseña incorrecto'});
                };
            }else{
                return res.status(401).json({mensaje: 'Jerarquia, cedula, usuario o contraseña incorrectos'});
            }
        });
    });
});

export default login;