import express from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import {
    crearEjercicioSchema
} from "../validators/ejercicios.validators.js";
import {
    crearDesafio,
    obtenerDesafios,
    obtenerDesafioPorId,
    actualizarDesafio,
    eliminarDesafio
} from "../controllers/desafios.controller.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/desafios
router.post("/", crearDesafio)
router.get("/", obtenerDesafios)
router.get("/:id", obtenerDesafioPorId)
router.patch("/:id", actualizarDesafio)
router.delete("/:id", eliminarDesafio)

export default router;