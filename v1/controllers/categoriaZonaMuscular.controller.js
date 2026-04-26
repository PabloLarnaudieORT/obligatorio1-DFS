import {
    crearCategoriaZonaMusculoService,
    obtenerCategoriaZonaMusculoService,
    obtenerCategoriaZonaMusculoServicePorIdService,
    actualizarCategoriaZonaMusculoService,
    eliminarCategoriaZonaMusculoService
} from "../services/categoriaZonaMuscular.services.js";

export const crearCategoriaZonaMusculo = async (req, res) => {
    const categoriaCreada = await crearCategoriaZonaMusculoService(req.body);
    res.json({ message: "Categoría de zona muscular agregada exitosamente", ...categoriaCreada });
}

export const obtenerCategoriaZonaMusculo = async (req, res) => {
    const categoriasObtenidas = await obtenerCategoriaZonaMusculoService();
    res.json({ message: "Categorías de zona muscular obtenidas", categorias: categoriasObtenidas });
}

export const obtenerCategoriaZonaMusculoServicePorId = async (req, res) => {
    const { id } = req.params;
    const categoriaObtenida = await obtenerCategoriaZonaMusculoServicePorIdService(id);
    res.json({ message: `Categoría de zona muscular ${categoriaObtenida.id} obtenida con exito`, categoria: categoriaObtenida });
}

export const actualizarCategoriaZonaMusculo = async (req, res) => {
    const { id } = req.params;
    const categoriaActualizada = await actualizarCategoriaZonaMusculoService(id, req.body);
    res.json({ message: `Categoría de zona muscular ${categoriaActualizada.id} actualizada exitosamente`, ...categoriaActualizada });
}

export const eliminarCategoriaZonaMusculo = async (req, res) => {
    const { id } = req.params;
    const categoriaEliminada = await eliminarCategoriaZonaMusculoService(id);
    res.json({ message: `Categoría de zona muscular ${categoriaEliminada.id} eliminada exitosamente`, ...categoriaEliminada });
}