import express from "express";
import Router from "./routes/EcommersRouter";
import cors from "cors";

const app = express();

//configuraaciones de CORS
const corsOptions = {
    "origin": process.env.ORIGIN_CORS,
    "methods": "GET, POST, PUT, DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
}

app.use(cors(corsOptions));

app.use(express.json());

//Rutas de usuario
app.use('/api', Router);

const PORT = process.env.PORT;

app.listen(PORT, () => { });
