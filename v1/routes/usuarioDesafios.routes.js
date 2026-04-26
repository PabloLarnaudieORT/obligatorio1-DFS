import express from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";

/*
import {
    crearRutinaSchema
} from "../validators/rutinas.validators.js";
*/

import {
    crearUsuarioDesafios,
    obtenerUsuarioDesafios,
    obtenerUsuarioDesafiosPorId,
    actualizarUsuarioDesafios,
    eliminarUsuarioDesafios
} from "../controllers/usuarioDesafios.controller.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/usuario-desafios
router.get("/", obtenerUsuarioDesafios)
router.get("/:id", obtenerUsuarioDesafiosPorId)
router.post("/", crearUsuarioDesafios)
router.patch("/:id", actualizarUsuarioDesafios)
router.delete("/:id", eliminarUsuarioDesafios)

export default router;