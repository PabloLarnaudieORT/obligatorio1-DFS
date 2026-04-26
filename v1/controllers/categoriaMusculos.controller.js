import {
    crearCategoriaMusculoService,
    obtenerCategoriasMusculosService,
    obtenerCategoriaMusculoPorIdService,
    actualizarCategoriaMusculoService,
    eliminarCategoriaMusculoService
} from "../services/categoriaMusculos.services.js";

export const crearCategoriaMuscular = async (req, res) => {
    const categoriaMuscularCreada = await crearCategoriaMusculoService(req.body);
    res.json({ message: "Categoria muscular agregada exitosamente", ...categoriaMuscularCreada });
}

export const obtenerCategoriasMusculares = async (req, res) => {
    const categoriasMuscularesObtenidas = await obtenerCategoriasMusculosService();
    res.json({ message: "Categorias musculares obtenidas", categoriasMusculares: categoriasMuscularesObtenidas });
}   

export const obtenerCategoriaMuscularPorId = async (req, res) => {
    const { id } = req.params;
    const categoriaMuscularObtenida = await obtenerCategoriaMusculoPorIdService(id);
    res.json({ message: `Categoria muscular ${categoriaMuscularObtenida.id} obtenida con exito`, categoriaMuscular: categoriaMuscularObtenida });
}

export const actualizarCategoriaMuscular = async (req, res) => {
    const { id } = req.params;
    const categoriaMuscularActualizada = await actualizarCategoriaMusculoService(id, req.body);
    res.json({ message: `Categoria muscular ${categoriaMuscularActualizada.id} actualizada exitosamente`, ...categoriaMuscularActualizada });
}

export const eliminarCategoriaMuscular = async (req, res) => {
    const { id } = req.params;
    const categoriaMuscularEliminada = await eliminarCategoriaMusculoService(id);
    res.json({ message: `Categoria muscular ${categoriaMuscularEliminada.id} eliminada exitosamente`, ...categoriaMuscularEliminada });
}