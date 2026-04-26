
import {
    createDesafioEjercicioService,
    obtenerDesafiosEjercicioService,
    obtenerDesafioEjercicioPorIdService,
    actualizarDesafioEjercicioService,
    eliminarDesafioEjercicioService
} from "../services/desafioEjercicio.service.js";

// Controladores para las rutinas
export const crearDesafioEjercicio = async (req, res) => {
    const desafioCreado = await createDesafioEjercicioService(req.body);
    res.json({ message: "Desafío agregado exitosamente", ...desafioCreado });
}

export const obtenerDesafiosEjercicio = async (req, res) => {
    const desafiosObtenidos = await obtenerDesafiosEjercicioService();
    res.json({ message: "Desafíos obtenidos", desafios: desafiosObtenidos });
}

export const obtenerDesafioEjercicioPorId = async (req, res) => {
    const { id } = req.params;
    const desafioObtenido = await obtenerDesafioEjercicioPorIdService(id);
    res.json({ message: `Desafío ${desafioObtenido.id} obtenido con exito`, desafio: desafioObtenido });
}

export const actualizarDesafioEjercicio = async (req, res) => {
    const { id } = req.params;
    const desafioActualizado = await actualizarDesafioEjercicioService(id, req.body);
    res.json({ message: `Desafío ${desafioActualizado.id} actualizado exitosamente`, ...desafioActualizado });
}

export const eliminarDesafioEjercicio = async (req, res) => {
    const { id } = req.params;
    const desafioEliminado = await eliminarDesafioEjercicioService(id);
    res.json({ message: `Desafío ${desafioEliminado.id} eliminado exitosamente`, ...desafioEliminado });
}