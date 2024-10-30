import express from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();

//configuraaciones de CORS
const corsOptions = {
    origin: process.env.ORIGIN_CORS,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.json());

//Rutas de usuario
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`solicitudes cors permitidas desde: ${process.env.ORIGIN_CORS}`);
});
