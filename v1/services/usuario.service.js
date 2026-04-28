import Usuario from "../models/usuario.model.js";
import UsuarioDesafios from "../models/usuarioDesafios.model.js";
import UsuarioProductos from "../models/usuarioProductos.model.js";
import { isValidObjectId } from "mongoose";

export const obtenerUsuariosService = async (page, limit) => {
    limit = Number(limit) || 5; // Valor predeterminado de 5 si no se proporciona
    page = Number(page) || 1;
    const skip = (page - 1) * limit;

    const cantidadUsuarios = await Usuario.countDocuments();
    const totalPages = Math.ceil(cantidadUsuarios / limit);

    const usuarios = await Usuario.find().select("-password").skip(skip).limit(limit);

    const usuariosFiltrados = await Promise.all(usuarios.map(async (usuario) => {
        if (usuario.rol === "admin") {
            return { id: usuario._id, username: usuario.username, rol: usuario.rol };
        }
        const productos = await UsuarioProductos.find({ idUsuario: usuario._id }).populate("idProducto", "nombreProducto puntosRequeridos beneficio");
        const desafios = await UsuarioDesafios.find({ idUsuario: usuario._id }).populate("idDesafio", "nombreDesafio descripcion puntosRecompensa");
        return { ...usuario.toObject(), productos, desafios };
    }));

    return {
        total: cantidadUsuarios,
        totalPages,
        currentPage: page,
        usuarios: usuariosFiltrados
    };
};

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
    if (!usuario) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }

    if (usuario.rol === "admin") {
        const error = new Error("Los administradores no gestionan planes de suscripción");
        error.status = 403; // Forbidden
        throw error;
    }

    if (usuario.plan !== "plus") {
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