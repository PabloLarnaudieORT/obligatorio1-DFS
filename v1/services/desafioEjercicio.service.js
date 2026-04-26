import DesafioEjercicio from "../models/desafioEjercicio.model.js";
import Ejercicio from "../models/ejercicio.model.js";
import Desafio from "../models/desafio.model.js";
import { isValidObjectId } from "mongoose";

export const createDesafioEjercicioService = async (desafioEjercicio) => {
    try {
        const nuevoDesafioEjercicio = new DesafioEjercicio(desafioEjercicio);
        await nuevoDesafioEjercicio.save();
        return nuevoDesafioEjercicio;
    } catch (error) {
        const err = new Error("Error al crear el desafío");
        err.status = error.name === "ValidationError" ? 400 : 500;  
        err.details = error.errors || error.message;
        throw err;
    }   
}

export const obtenerDesafiosEjercicioService = async () => {
    try {
        const desafios = await DesafioEjercicio.find().populate("idDesafio", "nombreDesafio").populate("idEjercicios", "nombreEjercicio");
        return desafios;
    } catch (error) { 
        throw new Error ("Error al obtener los desafíos");
    }
}

export const obtenerDesafioEjercicioPorIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const desafio = await DesafioEjercicio.findById(id).populate("idDesafio", "nombreDesafio").populate("idEjercicios", "nombreEjercicio");

    if (!desafio) {
        const errorId = new Error("Desafío no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   
    return desafio;
}

export const actualizarDesafioEjercicioService = async (id, data) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const desafio = await DesafioEjercicio.findById(id).populate("idDesafio", "nombreDesafio").populate("idEjercicios", "nombreEjercicio");

    if (!desafio) {  
        const errorId = new Error("Desafío no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   

    const desafioActualizado = await DesafioEjercicio.findByIdAndUpdate(id, data, { returnDocument: "after"   }); 
    return desafioActualizado;
}

export const eliminarDesafioEjercicioService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const desafio = await DesafioEjercicio.findById(id).populate("idDesafio", "nombreDesafio").populate("idEjercicios", "nombreEjercicio");

    if (!desafio) {
        const errorId = new Error("Desafío no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const desafioEliminado = await DesafioEjercicio.findByIdAndDelete(id);
    return desafioEliminado;
}