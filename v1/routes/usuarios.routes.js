import express from "express";
import {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    actualizarPlanUsuario,
    eliminarUsuario,
} from "../controllers/usuarios.controller.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/usuarios
router.get("/", obtenerUsuarios)
router.get("/:id", obtenerUsuarioPorId)
router.patch("/:id", actualizarUsuario)
router.patch("/:id/plan", actualizarPlanUsuario)
router.delete("/:id", eliminarUsuario)

export default router;