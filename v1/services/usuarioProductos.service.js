import UsuarioProductos from "../models/usuarioProductos.model.js";
import { isValidObjectId } from "mongoose";

export const createUsuarioProductoService = async (usuarioProducto) => {
    try {
        const nuevoUsuarioProducto = new UsuarioProductos(usuarioProducto);
        await nuevoUsuarioProducto.save();
        return nuevoUsuarioProducto;
    } catch (error) {
        const err = new Error("Error al crear el usuario producto");
        err.status = error.name === "ValidationError" ? 400 : 500;  
        err.details = error.errors || error.message;
        throw err;
    }   
}

export const obtenerUsuarioProductosService = async () => {
    try {
        const usuarioProductos = await UsuarioProductos.find().populate("idUsuario", "username").populate("idProducto", "nombreProducto puntosRequeridos beneficio");
        return usuarioProductos;
    } catch (error) { 
        throw new Error ("Error al obtener los usuario productos");
    }
}

export const obtenerUsuarioProductoPorIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const usuarioProducto = await UsuarioProductos.findById(id).populate("idUsuario", "username").populate("idProducto", "nombreProducto puntosRequeridos beneficio");

    if (!usuarioProducto) {
        const errorId = new Error("Usuario producto no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   
    return usuarioProducto;
}

export const actualizarUsuarioProductoService = async (id, data) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const usuarioProducto = await UsuarioProductos.findById(id).populate("idUsuario", "username").populate("idProducto", "nombreProducto puntosRequeridos beneficio");

    if (!usuarioProducto) {  
        const errorId = new Error("Usuario producto no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   

    const usuarioProductoActualizado = await UsuarioProductos.findByIdAndUpdate(id, data, { returnDocument: "after"   }); 
    return usuarioProductoActualizado;
}

export const eliminarUsuarioProductoService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const usuarioProducto = await UsuarioProductos.findById(id).populate("idUsuario", "username").populate("idProducto", "nombreProducto puntosRequeridos beneficio");

    if (!usuarioProducto) {
        const errorId = new Error("Usuario producto no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const usuarioProductoEliminado = await UsuarioProductos.findByIdAndDelete(id);
    return usuarioProductoEliminado;
}