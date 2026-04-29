import {
    crearCategoriaZonaMusculoService,
    obtenerCategoriaZonaMusculoService,
    obtenerCategoriaZonaMusculoServicePorIdService,
    actualizarCategoriaZonaMusculoService,
    eliminarCategoriaZonaMusculoService
} from "../services/categoriaZonaMuscular.services.js";

export const crearCategoriaZonaMusculo = async (req, res) => {
    const userId = req.user?.id;
    const categoriaCreada = await crearCategoriaZonaMusculoService(req.body, userId);
    res.json({ message: "Categoría de zona muscular agregada exitosamente", ...categoriaCreada });
}

export const obtenerCategoriaZonaMusculo = async (req, res) => {
    const userId = req.user?.id;
    const userRol = req.user?.rol;
    const userIdFilter = userRol === 'admin' ? null : userId;
    
    const categoriasObtenidas = await obtenerCategoriaZonaMusculoService(userIdFilter);
    res.json({ message: "Categorías de zona muscular obtenidas", categorias: categoriasObtenidas });
}

export const obtenerCategoriaZonaMusculoServicePorId = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRol = req.user?.rol;
    const userIdFilter = userRol === 'admin' ? null : userId;
    
    const categoriaObtenida = await obtenerCategoriaZonaMusculoServicePorIdService(id, userIdFilter);
    res.json({ message: `Categoría de zona muscular ${categoriaObtenida.id} obtenida con exito`, categoria: categoriaObtenida });
}

export const actualizarCategoriaZonaMusculo = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRol = req.user?.rol;
    const userIdFilter = userRol === 'admin' ? null : userId;
    
    const categoriaActualizada = await actualizarCategoriaZonaMusculoService(id, req.body, userIdFilter);
    res.json({ message: `Categoría de zona muscular ${categoriaActualizada.id} actualizada exitosamente`, ...categoriaActualizada });
}

export const eliminarCategoriaZonaMusculo = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRol = req.user?.rol;
    const userIdFilter = userRol === 'admin' ? null : userId;
    
    const categoriaEliminada = await eliminarCategoriaZonaMusculoService(id, userIdFilter);
    res.json({ message: `Categoría de zona muscular ${categoriaEliminada.id} eliminada exitosamente`, ...categoriaEliminada });
}