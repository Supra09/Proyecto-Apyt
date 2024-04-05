import express from "express";


const produccion = express.Router();

produccion.get("/produccion", (req, res) => {
    res.send("produccion");
});

export default produccion;