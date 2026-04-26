import express from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";

import {
    crearProductoSchema
} from "../validators/productos.validators.js";
import {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
} from "../controllers/productos.controller.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/productos
router.get("/", obtenerProductos);
router.post("/", validateBody(crearProductoSchema), crearProducto);
router.get("/:id", obtenerProductoPorId);
router.patch("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);    

export default router;