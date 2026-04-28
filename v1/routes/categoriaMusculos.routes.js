import express from 'express';
import { validateBody } from '../middlewares/validateBody.middleware.js';

import {
    crearCategoriaMusculoSchema            
} from '../validators/categoriaMusculos.validators.js';

import {
    crearCategoriaMuscular,
    obtenerCategoriasMusculares,
    obtenerCategoriaMuscularPorId,
    actualizarCategoriaMuscular,
    eliminarCategoriaMuscular
} from '../controllers/categoriaMusculos.controller.js';    

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/categoriasMusculares
router.get("/", obtenerCategoriasMusculares);
router.post("/", validateBody(crearCategoriaMusculoSchema), crearCategoriaMuscular);
router.get("/:id", obtenerCategoriaMuscularPorId);
router.patch("/:id", actualizarCategoriaMuscular);
router.delete("/:id", eliminarCategoriaMuscular);

export default router;