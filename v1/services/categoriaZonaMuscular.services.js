import CategoriaZonaMuscular from "../models/categoriaZonaMuscular.model.js";
import { isValidObjectId } from "mongoose";

export const crearCategoriaZonaMusculoService = async (categoria, idUsuario) => {
    try {
        const nuevaCategoria = new CategoriaZonaMuscular({
            ...categoria,
            idUsuario
        });
        await nuevaCategoria.save();
        return nuevaCategoria;
    } catch (error) {
        const err = new Error("Error al crear la categoría de zona muscular");
        err.status = error.name === "ValidationError" ? 400 : 500;
        err.details = error.errors || error.message;
        throw err;
    }
}

export const obtenerCategoriaZonaMusculoService = async (userIdFilter) => {
    try {
        const query = userIdFilter ? { idUsuario: userIdFilter } : {};
        const categorias = await CategoriaZonaMuscular.find(query);
        return categorias;
    } catch (error) {
        throw new Error("Error al obtener las categorías de zona muscular");
    }

}

export const obtenerCategoriaZonaMusculoServicePorIdService = async (id, userIdFilter) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const query = { _id: id };
    if (userIdFilter) {
        query.idUsuario = userIdFilter;
    }

    const categoria = await CategoriaZonaMuscular.findOne(query);

    if (!categoria) {
        const errorId = new Error("Categoría de zona muscular no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }
    return categoria;
}

export const actualizarCategoriaZonaMusculoService = async (id, data, userIdFilter) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const query = { _id: id };
    if (userIdFilter) {
        query.idUsuario = userIdFilter;
    }

    const categoria = await CategoriaZonaMuscular.findOne(query);

    if (!categoria) {
        const errorId = new Error("Categoría de zona muscular no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const categoriaActualizada = await CategoriaZonaMuscular.findByIdAndUpdate(id, data, { returnDocument: "after" });
    return categoriaActualizada;
}

export const eliminarCategoriaZonaMusculoService = async (id, userIdFilter) => {

    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const query = { _id: id };
    if (userIdFilter) {
        query.idUsuario = userIdFilter;
    }

    const categoria = await CategoriaZonaMuscular.findOne(query);

    if (!categoria) {
        const errorId = new Error("Categoría de zona muscular no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const categoriaEliminada = await CategoriaZonaMuscular.findByIdAndDelete(id);
    return categoriaEliminada;
}