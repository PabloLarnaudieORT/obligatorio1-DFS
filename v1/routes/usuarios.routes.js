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
router.get("/", authorize(["user"]), obtenerUsuarios);
router.get("/:id", authorize(["user"]), obtenerUsuarioPorId);
router.patch("/:id", authorize(["user"]), actualizarUsuario);
router.patch("/:id/plan", authorize(["user"]), actualizarPlanUsuario);
router.delete("/:id", authorize(["user"]), eliminarUsuario);

export default router;