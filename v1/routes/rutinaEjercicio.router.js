import express from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";

import {
    crearRutinaEjercicio,
    obtenerRutinasEjercicio,
    obtenerRutinaEjercicioPorId,
    actualizarRutinaEjercicio,
    eliminarRutinaEjercicio
} from "../controllers/rutinaEjercicio.controller.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/rutinas
router.get("/", obtenerRutinasEjercicio)
router.get("/:id", obtenerRutinaEjercicioPorId)
router.post("/", crearRutinaEjercicio)
router.patch("/:id", actualizarRutinaEjercicio)
router.delete("/:id", eliminarRutinaEjercicio)

export default router;