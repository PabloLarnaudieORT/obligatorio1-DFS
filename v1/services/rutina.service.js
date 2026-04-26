import Rutina from "../models/rutina.model.js";
import RutinaEjercicio from "../models/rutinaEjercicio.model.js";
import Usuario from "../models/usuario.model.js";
import { isValidObjectId } from "mongoose";

export const createRutinaService = async (rutina, usuarioId) => {
    try {

        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            const error = new Error("Usuario no encontrado");
            error.status = 404;
            throw error;
        }

        if (usuario.plan === "plus") {
            const cantidadRutinas = await Rutina.countDocuments({ idUsuario: usuarioId });

            if (cantidadRutinas >= 4) {
                const error = new Error("'¡Límite alcanzado! Los usuarios PLUS solo pueden crear hasta 4 rutinas.'");
                error.status = 403;
                throw error;
            }
        }

        const nuevaRutina = new Rutina(rutina, usuarioId);
        await nuevaRutina.save();
        return nuevaRutina;
    } catch (error) {
        const err = new Error("Error al crear la rutina");
        err.status = error.name === "ValidationError" ? 400 : 500;
        err.details = error.errors || error.message;
        throw err;
    }
}

export const obtenerRutinasCompletasService = async (page, limit) => {
    limit = Number(limit) || 10; // Valor predeterminado de 10 si no se proporciona
    page = Number(page) || 1;
    const skip = (page - 1) * limit;

    const cantidadRutinas = await Rutina.countDocuments();
    const totalPages = Math.ceil(cantidadRutinas / limit);
    const rutinas = await Rutina.find().skip(skip).limit(limit).populate("idUsuarioCreador", "username plan").populate("categoriaZonaMuscular", "_id nombreCategoriaZona");

    const resultado = await Promise.all(
        rutinas.map(async (rutina) => {
            const ejercicios = await RutinaEjercicio.find({ idRutina: rutina._id }).populate("idEjercicio");

            return {
                ...rutina.toObject(),
                ejercicios
            };
        })
    );

    return resultado;
};

export const obtenerRutinaCompletaPorIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        throw errorId;
    }

    const rutina = await Rutina.findById(id).populate("categoriaZonaMuscular", "nombreCategoriaZona").populate("idUsuario", "username plan").populate("categoriaZonaMuscular", "_id nombreCategoriaZona").populate("listaEjercicios");

    if (!rutina) {
        const errorId = new Error("Rutina no encontrada");
        errorId.status = 404;
        throw errorId;
    }

    const ejercicios = (await RutinaEjercicio.find({ idRutina: id }).populate("idEjercicio"))

    return {
        ...rutina.toObject(),
        ejercicios
    };
};

export const actualizarRutinaService = async (id, data) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const rutina = await Rutina.findById(id);

    if (!rutina) {
        const errorId = new Error("Rutina no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const rutinaActualizada = await Rutina.findByIdAndUpdate(id, data, { returnDocument: "after" });
    return rutinaActualizada;
}

export const eliminarRutinaService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const rutina = await Rutina.findById(id);

    if (!rutina) {
        const errorId = new Error("Rutina no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const rutinaEliminada = await Rutina.findByIdAndDelete(id);
    return rutinaEliminada;
}