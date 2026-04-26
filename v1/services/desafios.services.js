import Desafio from "../models/desafio.model.js";
import DesafioEjercicio from "../models/desafioEjercicio.model.js";
import { isValidObjectId } from "mongoose";

export const crearDesafioService = async (desafio) => {
    try {
        const nuevoDesafio = new Desafio(desafio);
        await nuevoDesafio.save();
        return nuevoDesafio;
    } catch (error) {
        const err = new Error("Error al crear el desafío");
        err.status = error.name === "ValidationError" ? 400 : 500;
        err.details = error.errors || error.message;
        throw err;
    }
}

export const obtenerDesafiosService = async () => {
    const desafios = await Desafio.find()

    const resultado = await Promise.all(
        desafios.map(async (desafio) => {
            const ejercicios = await DesafioEjercicio.find({ idDesafio: desafio._id }).populate("idDesafio","nombreDesafio").populate("idEjercicios", "nombreEjercicio");

            return {
                ...desafio.toObject(),
                ejercicios
            };
        })
    );

    return resultado;

}

export const obtenerDesafioPorIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const desafio = await Desafio.findById(id);

    if (!desafio) {
        const errorId = new Error("Desafío no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }
    return desafio;
}

export const actualizarDesafioService = async (id, data) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const desafio = await Desafio.findById(id);

    if (!desafio) {
        const errorId = new Error("Desafío no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const desafioActualizado = await Desafio.findByIdAndUpdate(id, data, { returnDocument: "after" });
    return desafioActualizado;
}

export const eliminarDesafioService = async (id) => {

    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const desafio = await Desafio.findById(id);

    if (!desafio) {
        const errorId = new Error("Desafío no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const desafioEliminado = await Desafio.findByIdAndDelete(id);
    return desafioEliminado;
}