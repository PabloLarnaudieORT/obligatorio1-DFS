
import {
    createUsuarioProductoService,
    obtenerUsuarioProductosService,
    obtenerUsuarioProductoPorIdService,
    actualizarUsuarioProductoService,
    eliminarUsuarioProductoService
} from "../services/usuarioProductos.service.js";

// Controladores para las rutinas
export const crearUsuarioProducto = async (req, res) => {
    const usuarioProductoCreado = await createUsuarioProductoService(req.body);
    res.json({ message: "Usuario producto agregado exitosamente", ...usuarioProductoCreado });
}

export const obtenerUsuarioProductos = async (req, res) => { 
    const usuarioProductosObtenidos = await obtenerUsuarioProductosService();
    res.json({ message: "Usuario productos obtenidos", usuarioProductos: usuarioProductosObtenidos });
}

export const obtenerUsuarioProductoPorId = async (req, res) => {
    const { id } = req.params;
    const usuarioProductoObtenido = await obtenerUsuarioProductoPorIdService(id);
    res.json({ message: `Usuario producto ${usuarioProductoObtenido.id} obtenido con exito`, usuarioProducto: usuarioProductoObtenido });
}

export const actualizarUsuarioProducto = async (req, res) => {
    const { id } = req.params;
    const usuarioProductoActualizado = await actualizarUsuarioProductoService(id, req.body);
    res.json({ message: `Usuario producto ${usuarioProductoActualizado.id} actualizado exitosamente`, ...usuarioProductoActualizado });
}

export const eliminarUsuarioProducto = async (req, res) => {
    const { id } = req.params;
    const usuarioProductoEliminado = await eliminarUsuarioProductoService(id);
    res.json({ message: `Usuario producto ${usuarioProductoEliminado.id} eliminado exitosamente`, ...usuarioProductoEliminado });
}