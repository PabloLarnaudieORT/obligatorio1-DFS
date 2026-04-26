import {
    crearEjercicioService,
    obtenerEjercicioPorIdService,
    obtenerEjerciciosService,
    actualizarEjercicioService,
    eliminarEjercicioService
} from "../services/ejercicio.services.js";

export const crearEjercicio = async (req, res) => {
    const ejercicioCreado = await crearEjercicioService(req.body);
    res.json({ message: "Ejercicio agregado exitosamente", ...ejercicioCreado });
}

export const obtenerEjercicios = async (req, res) => {
    const ejerciciosObtenidos = await obtenerEjerciciosService();
    res.json({ message: "Ejercicios obtenidos", ejercicios: ejerciciosObtenidos });
}

export const obtenerEjercicioPorId = async (req, res) => {
    const { id } = req.params;
    const ejercicioObtenido = await obtenerEjercicioPorIdService(id);
    res.json({ message: `Ejercicio ${ejercicioObtenido.id} obtenido con exito`, ejercicio: ejercicioObtenido });
}

export const actualizarEjercicio = async (req, res) => {
    const { id } = req.params;
    const ejercicioActualizado = await actualizarEjercicioService(id, req.body);
    res.json({ message: `Ejercicio ${ejercicioActualizado.id} actualizado exitosamente`, ...ejercicioActualizado });
}

export const eliminarEjercicio = async (req, res) => {
    const { id } = req.params;
    const ejercicioEliminado = await eliminarEjercicioService(id);
    res.json({ message: `Ejercicio ${ejercicioEliminado.id} eliminado exitosamente`, ...ejercicioEliminado });
}