import {
    crearCategoriaMusculoService,
    obtenerCategoriasMusculosService,
    obtenerCategoriaMusculoPorIdService,
    actualizarCategoriaMusculoService,
    eliminarCategoriaMusculoService
} from "../services/categoriaMusculos.services.js";

export const crearCategoriaMuscular = async (req, res) => {
    const userId = req.user?.id;
    const categoriaMuscularCreada = await crearCategoriaMusculoService(req.body, userId);
    res.json({ message: "Categoria muscular agregada exitosamente", ...categoriaMuscularCreada });
}

export const obtenerCategoriasMusculares = async (req, res) => {
    const userId = req.user?.id;
    const userRol = req.user?.rol;
    const userIdFilter = userRol === 'admin' ? null : userId;
    
    const categoriasMuscularesObtenidas = await obtenerCategoriasMusculosService(userIdFilter);
    res.json({ message: "Categorias musculares obtenidas", categoriasMusculares: categoriasMuscularesObtenidas });
}   

export const obtenerCategoriaMuscularPorId = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRol = req.user?.rol;
    const userIdFilter = userRol === 'admin' ? null : userId;
    
    const categoriaMuscularObtenida = await obtenerCategoriaMusculoPorIdService(id, userIdFilter);
    res.json({ message: `Categoria muscular ${categoriaMuscularObtenida.id} obtenida con exito`, categoriaMuscular: categoriaMuscularObtenida });
}

export const actualizarCategoriaMuscular = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRol = req.user?.rol;
    const userIdFilter = userRol === 'admin' ? null : userId;
    
    const categoriaMuscularActualizada = await actualizarCategoriaMusculoService(id, req.body, userIdFilter);
    res.json({ message: `Categoria muscular ${categoriaMuscularActualizada.id} actualizada exitosamente`, ...categoriaMuscularActualizada });
}

export const eliminarCategoriaMuscular = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRol = req.user?.rol;
    const userIdFilter = userRol === 'admin' ? null : userId;
    
    const categoriaMuscularEliminada = await eliminarCategoriaMusculoService(id, userIdFilter);
    res.json({ message: `Categoria muscular ${categoriaMuscularEliminada.id} eliminada exitosamente`, ...categoriaMuscularEliminada });
}