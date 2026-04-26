import Usuario from "../models/usuario.model.js";
import UsuarioDesafios from "../models/usuarioDesafios.model.js";
import UsuarioProductos from "../models/usuarioProductos.model.js";
import { isValidObjectId } from "mongoose";

export const obtenerUsuariosService = async () => {
    const usuarios = await Usuario.find().select("-password");
    return usuarios;
}

export const obtenerUsuarioPorIdService = async (id) => {
    const usuario = await Usuario.findById(id).select("-password");
    return usuario;
}

export const actualizarUsuarioService = async (id, data) => {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, data, { returnDocument: "after" });
    return usuarioActualizado;
}

export const actualizarPlanUsuarioService = async (id) => {
    const usuario = await Usuario.findById(id);
    if(!usuario) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }

    if (usuario.rol === "admin") {
        const error = new Error("Los administradores no gestionan planes de suscripción");
        error.status = 403; // Forbidden
        throw error;
    }

    if(usuario.plan !== "plus") {
        const error = new Error("Solo los usuarios con plan 'plus' pueden actualizar a 'premium'");
        error.status = 400;
        throw error;
    }

    usuario.plan = "premium";
    await usuario.save();
    return usuario;
}

export const eliminarUsuarioService = async (id) => {

    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
        const errorId = new Error("Usuario no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    return usuarioEliminado;
}