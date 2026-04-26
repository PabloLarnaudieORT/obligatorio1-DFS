
import {
    createUsuarioDesafiosService,
    obtenerUsuarioDesafiosService,
    obtenerUsuarioDesafiosPorIdService,
    actualizarUsuarioDesafiosService,
    eliminarUsuarioDesafiosService
} from "../services/usuarioDesafio.service.js";

// Controladores para las rutinas
export const crearUsuarioDesafios = async (req, res) => {
    const inscripcionCreada = await createUsuarioDesafiosService(req.body);
    res.json({ message: "Inscripción agregada exitosamente", ...inscripcionCreada });
}

export const obtenerUsuarioDesafios = async (req, res) => {
    const inscripcionesObtenidas = await obtenerUsuarioDesafiosService();
    res.json({ message: "Inscripciones obtenidas", inscripciones: inscripcionesObtenidas });
}

export const obtenerUsuarioDesafiosPorId = async (req, res) => {
    const { id } = req.params;
    const inscripcionObtenida = await obtenerUsuarioDesafiosPorIdService(id);
    res.json({ message: `Inscripción ${inscripcionObtenida.id} obtenida con exito`, inscripcion: inscripcionObtenida });
}

export const actualizarUsuarioDesafios = async (req, res) => {
    const { id } = req.params;
    const inscripcionActualizada = await actualizarUsuarioDesafiosService(id, req.body);
    res.json({ message: `Inscripción ${inscripcionActualizada.id} actualizada exitosamente`, ...inscripcionActualizada });
}

export const eliminarUsuarioDesafios = async (req, res) => {
    const { id } = req.params;
    const inscripcionEliminada = await eliminarUsuarioDesafiosService(id);
    res.json({ message: `Inscripción ${inscripcionEliminada.id} eliminada exitosamente`, ...inscripcionEliminada });
}