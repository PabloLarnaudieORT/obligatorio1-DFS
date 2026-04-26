import express from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";

import {
    crearRutinaSchema
} from "../validators/rutinas.validators.js";
import {
    crearRutina,
    obtenerRutinasCompletas,
    actualizarRutina,
    eliminarRutina,
    obtenerRutinaCompletaPorId
} from "../controllers/rutinas.controller.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/rutinas
router.get("/", obtenerRutinasCompletas)
router.get("/:id/completaPorId", obtenerRutinaCompletaPorId)
router.post("/", validateBody(crearRutinaSchema), crearRutina)
router.patch("/:id", actualizarRutina)
router.delete("/:id", eliminarRutina)

export default router;