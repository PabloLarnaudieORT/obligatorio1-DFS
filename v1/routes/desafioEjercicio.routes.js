import express from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";

/*
import {
    crearRutinaSchema
} from "../validators/rutinas.validators.js";
*/

import {
    crearDesafioEjercicio,
    obtenerDesafiosEjercicio,
    obtenerDesafioEjercicioPorId,
    actualizarDesafioEjercicio,
    eliminarDesafioEjercicio
} from "../controllers/desafioEjercicio.controller.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/desafios-ejercicio
router.get("/", obtenerDesafiosEjercicio)
router.get("/:id", obtenerDesafioEjercicioPorId)
router.post("/", crearDesafioEjercicio)
router.patch("/:id", actualizarDesafioEjercicio)
router.delete("/:id", eliminarDesafioEjercicio)

export default router;