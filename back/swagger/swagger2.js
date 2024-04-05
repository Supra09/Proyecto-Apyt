import swaggerJSDocs from "./swagger";
import SwaggerUi from "swagger-ui-express";

const pretex = {
    definition: {
        openapi: "3.0.0",
        info: {
            tittle: "Apyt",
            version: "1.0.0",
            description: `Este es tu 👩‍🏫asistente de procesos y 
                tipificación 📖`,
            contact: {
                name: "Apyt Group",
                url: "Apyt.com",
                email: "asistente@hotmail.com"
            },
        },
    },

    servers: [
        {
            url: "http://localhost:3301",
            description: `Servidor local`
        },
    ],
    apis: ["./src/routes/agregar.js"],
    
    
   
   
};

const swaggerSpec = swaggerJSDoc(pretex);
const swaggerJSDocs = (app, port) => {
    app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
    app.get("/api-docs.json", (req, res) => {
        res.setHeader("contenType", "application/json");
        res.send(swaggerSpec);
    });
    console.log(`
    Versión 2 de la documentación en httP://localhost:${port}/api-docs
    
    
    `); 
}

