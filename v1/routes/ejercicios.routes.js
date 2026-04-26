import express from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import {
    crearEjercicioSchema
} from "../validators/ejercicios.validators.js";
import {
    crearEjercicio,
    obtenerEjercicios,
    obtenerEjercicioPorId,
    actualizarEjercicio,
    eliminarEjercicio
} from "../controllers/ejercicios.controller.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/ejercicios
router.get("/", obtenerEjercicios)
router.get("/:id", obtenerEjercicioPorId)
router.post("/", validateBody(crearEjercicioSchema), crearEjercicio)
router.patch("/:id", actualizarEjercicio)
router.delete("/:id", eliminarEjercicio)

export default router;