import {
    crearDesafioService,
    obtenerDesafioPorIdService,
    obtenerDesafiosService,
    actualizarDesafioService,
    eliminarDesafioService
} from "../services/desafios.services.js";

export const crearDesafio = async (req, res) => {
    const desafioCreado = await crearDesafioService(req.body);
    res.json({ message: "Desafio agregado exitosamente", ...desafioCreado });
}

export const obtenerDesafios = async (req, res) => {
    const desafiosObtenidos = await obtenerDesafiosService();
    res.json({ message: "Desafios obtenidos", desafios: desafiosObtenidos });
}

export const obtenerDesafioPorId = async (req, res) => {
    const { id } = req.params;
    const desafioObtenido = await obtenerDesafioPorIdService(id);
    res.json({ message: `Desafio ${desafioObtenido.id} obtenido con exito`, desafio: desafioObtenido });
}

export const actualizarDesafio = async (req, res) => {
    const { id } = req.params;
    const desafioActualizado = await actualizarDesafioService(id, req.body);
    res.json({ message: `Desafio ${desafioActualizado.id} actualizado exitosamente`, ...desafioActualizado });
}

export const eliminarDesafio = async (req, res) => {
    const { id } = req.params;
    const desafioEliminado = await eliminarDesafioService(id);
    res.json({ message: `Desafio ${desafioEliminado.id} eliminado exitosamente`, ...desafioEliminado });
}