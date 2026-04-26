import express from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";

/*
import {
    crearRutinaSchema
} from "../validators/rutinas.validators.js";
*/

import {
    crearUsuarioProducto,
    obtenerUsuarioProductos,
    obtenerUsuarioProductoPorId,
    actualizarUsuarioProducto,
    eliminarUsuarioProducto
} from "../controllers/usuarioProductos.controller.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/usuario-productos
router.get("/", obtenerUsuarioProductos)
router.get("/:id", obtenerUsuarioProductoPorId)
router.post("/", crearUsuarioProducto)
router.patch("/:id", actualizarUsuarioProducto)
router.delete("/:id", eliminarUsuarioProducto)

export default router;