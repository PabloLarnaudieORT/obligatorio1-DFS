import Ejercicio from "../models/ejercicio.model.js";
import { isValidObjectId } from "mongoose";

export const crearEjercicioService = async (ejercicio) => {
    try {
        const nuevoEjercicio = new Ejercicio(ejercicio);
        await nuevoEjercicio.save();
        return nuevoEjercicio;
    } catch (error) {
        const err = new Error("Error al crear el ejercicio");
        err.status = error.name === "ValidationError" ? 400 : 500;
        err.details = error.errors || error.message;
        throw err;
    }
}

export const obtenerEjerciciosService = async (page, limit, userId = null) => {
    try {
        limit = Number(limit) || 5;
        page = Number(page) || 1;
        const skip = (page - 1) * limit;
        
        let query = {};
        // Si se pasa un userId, filtrar por creador (para usuarios normales)
        // Si no se pasa userId, traer todos (para admin)
        if (userId) {
            query = { idUsuarioCreador: userId };
        }
        
        const ejercicios = await Ejercicio.find(query).skip(skip).limit(limit).populate("categoriaMusculo");
        const cantidadEjercicios = await Ejercicio.countDocuments(query);
        const totalPages = Math.ceil(cantidadEjercicios / limit);
        
        return {
            total: cantidadEjercicios,
            totalPages,
            currentPage: page,
            ejercicios
        };

    } catch (error) {
        console.error("EL ERROR REAL ES:", error);
        throw new Error("Error al obtener los ejercicios");
    }
};

// Servicio con filtro por Categoría
export const obtenerEjerciciosPorCategoriaService = async (categoriaId) => {
    try {
        return await Ejercicio.find({ categoriaMusculo: categoriaId }).populate("categoriaMusculo");
    } catch (error) {
        throw new Error("Error al obtener los ejercicios por categoría");
    }
};


export const obtenerEjercicioPorIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const ejercicio = await Ejercicio.findById(id);

    if (!ejercicio) {
        const errorId = new Error("Ejercicio no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }
    return ejercicio;
}

export const actualizarEjercicioService = async (id, data) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const ejercicio = await Ejercicio.findById(id);

    if (!ejercicio) {
        const errorId = new Error("Ejercicio no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const ejercicioActualizado = await Ejercicio.findByIdAndUpdate(id, data, { returnDocument: "after" });
    return ejercicioActualizado;
}

export const eliminarEjercicioService = async (id) => {

    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const ejercicio = await Ejercicio.findById(id);

    if (!ejercicio) {
        const errorId = new Error("Ejercicio no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const ejercicioEliminado = await Ejercicio.findByIdAndDelete(id);
    return ejercicioEliminado;
}