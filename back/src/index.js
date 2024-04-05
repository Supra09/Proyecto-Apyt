import express from "express";
import bodyParser from "body-parser";
import myConn from "express-myconnection";
import mysql from "mysql";
import cors from "cors";
import agregar from "./routes/agregar.js";
import login from "./routes/login.js";
import swaggerJSDocs from "../swagger.js";
import produccion from "./routes/produccion.js";


//constantes
const app = express();
const infoDb = {
    mysql: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "apyt",
    }
}    



const puerto = 3301;
app.listen(puerto, () => {
    console.info("servidor corriendo en el puerto", `http://localhost:${puerto}/`),
    swaggerJSDocs(app, puerto);
});

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(myConn(mysql, infoDb.mysql, "single"));

//rutas
app.get("/", (req, res) => {
    res.send(`conectado correctamente en el puerto ${puerto}`);
});
app.use("/", agregar);
app.use("/", login);
app.use("/", produccion);


