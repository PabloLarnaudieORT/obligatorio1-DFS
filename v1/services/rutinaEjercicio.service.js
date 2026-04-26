import RutinaEjercicio from "../models/rutinaEjercicio.model.js";
import { isValidObjectId } from "mongoose";

export const createRutinaEjercicioService = async (rutinaEjercicio) => {
    try {
        const nuevaRutinaEjercicio = new RutinaEjercicio(rutinaEjercicio);
        await nuevaRutinaEjercicio.save();
        return nuevaRutinaEjercicio;
    } catch (error) {
        const err = new Error("Error al crear la rutina");
        err.status = error.name === "ValidationError" ? 400 : 500;  
        err.details = error.errors || error.message;
        throw err;
    }   
}

export const obtenerRutinasEjercicioService = async () => {
    try {
        const rutinas = await RutinaEjercicio.find();
        return rutinas;
    } catch (error) { 
        throw new Error ("Error al obtener las rutinas");
    }
}

export const obtenerRutinaEjercicioPorIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const rutinaEjercicio = await RutinaEjercicio.findById(id);

    if (!rutinaEjercicio) {
        const errorId = new Error("Rutina ejercicio no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   
    return rutinaEjercicio;
}

export const actualizarRutinaEjercicioService = async (id, data) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const rutinaEjercicio = await RutinaEjercicio.findById(id);

    if (!rutinaEjercicio) {  
        const errorId = new Error("Rutina ejercicio no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   

    const rutinaActualizada = await RutinaEjercicio.findByIdAndUpdate(id, data, { returnDocument: "after"   }); 
    return rutinaActualizada;
}

export const eliminarRutinaEjercicioService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const rutinaEjercicio = await RutinaEjercicio.findById(id);

    if (!rutinaEjercicio) {
        const errorId = new Error("Rutina ejercicio no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const rutinaEliminada = await RutinaEjercicio.findByIdAndDelete(id);
    return rutinaEliminada;
}