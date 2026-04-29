import express from "express";
import {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    actualizarPlanUsuario,
    eliminarUsuario,
} from "../controllers/usuarios.controller.js";
import authorize from "../middlewares/rol.middleware.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/usuarios
router.get("/", authorize(["admin"]), obtenerUsuarios);
router.get("/:id", authorize(["admin"]), obtenerUsuarioPorId);
router.patch("/:id", authorize(["admin"]), actualizarUsuario);
router.patch("/:id/plan", authorize(["user"]), actualizarPlanUsuario);
router.delete("/:id", authorize(["admin"]), eliminarUsuario);

export default router;