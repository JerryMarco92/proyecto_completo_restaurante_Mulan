import "dotenv/config";
import express from "express";
import cors from "cors";
import platosRoutes from "./routes/platos.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { rutaNoEncontrada } from "./middlewares/rutaNoEncontrada.js";


const app = express();
const PORT = process.env.PORT || 3000;

const originsPermitidos = [
    process.env.FRONTEND_URL,
    "http://localhost:4321"
].filter(Boolean);

console.log("Orígenes permitidos:", originsPermitidos);

app.use(cors({
    origin: originsPermitidos,
    methods: ["GET"]
}));

app.use(express.json());

app.use(platosRoutes);

app.use(rutaNoEncontrada);

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend disponible en puerto: ${PORT}`);
});