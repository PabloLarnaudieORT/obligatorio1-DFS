import express from "express";
import { validateBody } from "../middlewares/validateBody.middleware.js";
import {
    crearCategoriaZonaMuscularSchema
} from "../validators/categoriaZonaMuscular.validators.js";
import {
    crearCategoriaZonaMusculo,
    obtenerCategoriaZonaMusculo,
    obtenerCategoriaZonaMusculoServicePorId,
    actualizarCategoriaZonaMusculo,
    eliminarCategoriaZonaMusculo
} from "../controllers/categoriaZonaMuscular.controller.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/categorias-zona-musculo
router.post("/", validateBody(crearCategoriaZonaMuscularSchema), crearCategoriaZonaMusculo)
router.get("/", obtenerCategoriaZonaMusculo)
router.get("/:id", obtenerCategoriaZonaMusculoServicePorId)
router.patch("/:id", actualizarCategoriaZonaMusculo)
router.delete("/:id", eliminarCategoriaZonaMusculo)

export default router;