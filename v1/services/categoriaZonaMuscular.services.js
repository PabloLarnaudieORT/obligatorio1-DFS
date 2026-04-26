import CategoriaZonaMuscular from "../models/categoriaZonaMuscular.model.js";
import { isValidObjectId } from "mongoose";

export const crearCategoriaZonaMusculoService = async (categoria) => {
    try {
        const nuevaCategoria = new CategoriaZonaMuscular(categoria);
        await nuevaCategoria.save();
        return nuevaCategoria;
    } catch (error) {
        const err = new Error("Error al crear la categoría de zona muscular");
        err.status = error.name === "ValidationError" ? 400 : 500;
        err.details = error.errors || error.message;
        throw err;
    }
}

export const obtenerCategoriaZonaMusculoService = async () => {
    try {
        const categorias = await CategoriaZonaMuscular.find();
        return categorias;
    } catch (error) {
        throw new Error("Error al obtener las categorías de zona muscular");
    }

}

export const obtenerCategoriaZonaMusculoServicePorIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const categoria = await CategoriaZonaMuscular.findById(id);

    if (!categoria) {
        const errorId = new Error("Categoría de zona muscular no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }
    return categoria;
}

export const actualizarCategoriaZonaMusculoService = async (id, data) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const categoria = await CategoriaZonaMuscular.findById(id);

    if (!categoria) {
        const errorId = new Error("Categoría de zona muscular no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const categoriaActualizada = await CategoriaZonaMuscular.findByIdAndUpdate(id, data, { returnDocument: "after" });
    return categoriaActualizada;
}

export const eliminarCategoriaZonaMusculoService = async (id) => {

    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const categoria = await CategoriaZonaMuscular.findById(id);

    if (!categoria) {
        const errorId = new Error("Categoría de zona muscular no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const categoriaEliminada = await CategoriaZonaMuscular.findByIdAndDelete(id);
    return categoriaEliminada;
}