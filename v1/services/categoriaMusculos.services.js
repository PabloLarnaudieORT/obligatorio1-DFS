import CategoriaMusculo from "../models/categoriaMusculos.model.js";
import { isValidObjectId } from "mongoose";

export const crearCategoriaMusculoService = async (categoriaMusculo, idUsuario) => {
    try {
        const nuevaCategoriaMusculo = new CategoriaMusculo({
            ...categoriaMusculo,
            idUsuario
        });
        await nuevaCategoriaMusculo.save();
        return nuevaCategoriaMusculo;
    }   catch (error) {
        const err = new Error("Error al crear la categoria muscular");
        err.status = error.name === "ValidationError" ? 400 : 500;
        err.details = error.errors || error.message;
        throw err;
    }   
}

export const obtenerCategoriasMusculosService = async (userIdFilter) => {
    try {
        const query = userIdFilter ? { idUsuario: userIdFilter } : {};
        const categoriasMusculos = await CategoriaMusculo.find(query);
        return categoriasMusculos;
    }   catch (error) {
        throw new Error("Error al obtener las categorias musculares");
    }   
}

export const obtenerCategoriaMusculoPorIdService = async (id, userIdFilter) => {
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

    const categoriaMusculo = await CategoriaMusculo.findOne(query);

    if (!categoriaMusculo) {
        const errorId = new Error("Categoria muscular no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   
    return categoriaMusculo;
}

export const actualizarCategoriaMusculoService = async (id, data, userIdFilter) => {
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

    const categoriaMusculo = await CategoriaMusculo.findOne(query);

    if (!categoriaMusculo) {
        const errorId = new Error("Categoria muscular no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const categoriaMusculoActualizada = await CategoriaMusculo.findByIdAndUpdate(id, data, { returnDocument: "after" });
    return categoriaMusculoActualizada; 
}

export const eliminarCategoriaMusculoService = async (id, userIdFilter) => {
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

    const categoriaMusculo = await CategoriaMusculo.findOne(query);

    if (!categoriaMusculo) {
        const errorId = new Error("Categoria muscular no encontrada");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   

    const categoriaMusculoEliminada = await CategoriaMusculo.findByIdAndDelete(id);
    return categoriaMusculoEliminada;
}