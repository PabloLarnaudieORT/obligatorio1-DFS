import {
    obtenerUsuarioPorIdService,
    obtenerUsuariosService,
    actualizarUsuarioService,
    actualizarPlanUsuarioService,
    eliminarUsuarioService
} from "../services/usuario.service.js";
import UsuarioDesafios from "../models/usuarioDesafios.model.js";
import UsuarioProductos from "../models/usuarioProductos.model.js";


export const obtenerUsuarios = async (req, res) => {
    const { page, limit } = req.query;
    const usuariosObtenidos = await obtenerUsuariosService(page, limit);

    res.json({
        message: "Usuarios obtenidos",
        total: usuariosObtenidos.total,
        totalPages: usuariosObtenidos.totalPages,
        currentPage: usuariosObtenidos.currentPage,
        usuarios: usuariosObtenidos.usuarios
    });
};

export const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    const usuarioObtenido = await obtenerUsuarioPorIdService(id);
    res.json({ message: `Usuario ${usuarioObtenido.id} obtenido con exito`, usuario: usuarioObtenido });
}

export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioActualizado = await actualizarUsuarioService(id, req.body);
    res.json({ message: `Usuario ${usuarioActualizado.id} actualizado exitosamente`, ...usuarioActualizado });
}

export const actualizarPlanUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioPlanActualizado = await actualizarPlanUsuarioService(id);
    res.json({ message: `Plan actualizado exitosamente`, usuario: usuarioPlanActualizado });
}

export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    const usuarioEliminado = await eliminarUsuarioService(id);
    res.json({ message: `Usuario ${usuarioEliminado.id} eliminado exitosamente`, usuario: usuarioEliminado });
}