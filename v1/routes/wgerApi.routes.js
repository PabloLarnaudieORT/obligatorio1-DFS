import express from "express";
import {
    obtenerEjerciciosWger,
    obtenerEjercicioPorIdWger,
    obtenerMusculosWger
} from "../controllers/wgerApi.controller.js";

const router = express.Router({ mergeParams: true });

//Peticiones a /v1/wger-api
router.get("/ejercicios", obtenerEjerciciosWger);
router.get("/ejercicios/:id", obtenerEjercicioPorIdWger);
router.get("/musculos", obtenerMusculosWger);

export default router;