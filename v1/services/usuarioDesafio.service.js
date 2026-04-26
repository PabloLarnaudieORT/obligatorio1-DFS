import UsuarioDesafios from "../models/usuarioDesafios.model.js";
import { isValidObjectId } from "mongoose";

export const createUsuarioDesafiosService = async (inscripcionDesafio) => {
    try {
        const nuevaInscripcionDesafio = new UsuarioDesafios(inscripcionDesafio);
        await nuevaInscripcionDesafio.save();
        return nuevaInscripcionDesafio;
    } catch (error) {
        const err = new Error("Error al crear la inscripción");
        err.status = error.name === "ValidationError" ? 400 : 500;  
        err.details = error.errors || error.message;
        throw err;
    }   
}

export const obtenerUsuarioDesafiosService = async () => {
        const inscripciones = await UsuarioDesafios.find().populate("idUsuario", "username").populate("idDesafio", "nombreDesafio");
        return inscripciones;
}

export const obtenerUsuarioDesafiosPorIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const inscripcion = await UsuarioDesafios.findById(id);

    if (!inscripcion) {
        const errorId = new Error("Inscripción no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   
    return inscripcion;
}

export const actualizarUsuarioDesafiosService = async (id, data) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const inscripcion = await UsuarioDesafios.findById(id);

    if (!inscripcion) {  
        const errorId = new Error("Inscripción no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   

    const inscripcionActualizada = await UsuarioDesafios.findByIdAndUpdate(id, data, { returnDocument: "after"   }); 
    return inscripcionActualizada;
}

export const eliminarUsuarioDesafiosService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const inscripcion = await UsuarioDesafios.findById(id);

    if (!inscripcion) {
        const errorId = new Error("Inscripción no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const inscripcionEliminada = await UsuarioDesafios.findByIdAndDelete(id);
    return inscripcionEliminada;
}