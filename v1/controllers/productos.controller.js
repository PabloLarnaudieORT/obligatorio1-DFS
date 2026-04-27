import {
        crearProductoService,
        obtenerProductoPorIdService,
        obtenerProductosService,
        actualizarProductoService,
        eliminarProductoService
} from "../services/productos.services.js";

export const crearProducto = async (req, res) => {
    const productoCreado = await crearProductoService(req.body);
    res.json({ message: "Producto agregado exitosamente", ...productoCreado });
}

export const obtenerProductos = async (req, res) => {
    const {page, limit} = req.query;
    const productosObtenidos = await obtenerProductosService(page, limit);
    res.json({ message: "Productos obtenidos", ...productosObtenidos });
}

export const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    const productoObtenido = await obtenerProductoPorIdService(id);
    res.json({ message: `Producto ${productoObtenido.id} obtenido con exito`, producto: productoObtenido });
}

export const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const productoActualizado = await actualizarProductoService(id, req.body);
    res.json({ message: `Producto ${productoActualizado.id} actualizado exitosamente`, ...productoActualizado });
}

export const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    const productoEliminado = await eliminarProductoService(id);
    res.json({ message: `Producto ${productoEliminado.id} eliminado exitosamente`, ...productoEliminado });
}