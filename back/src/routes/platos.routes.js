import express from "express";
import {
  obtenerPlatos,
  crearPlato,
  actualizarPlato,
  eliminarPlato,
  obtenerPlatoPorId
} from "../controllers/platos.controllers.js";
import { validarPlato } from "../middlewares/validarPlato.js";


const router = express.Router();

router.get("/platos", obtenerPlatos);

router.get("/platos/:id", obtenerPlatoPorId);

router.post("/platos", validarPlato, crearPlato);

router.put("/platos/:id", validarPlato, actualizarPlato);

router.delete("/platos/:id", eliminarPlato);

export default router;