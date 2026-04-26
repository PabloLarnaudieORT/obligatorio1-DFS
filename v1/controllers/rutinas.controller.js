
import {
    createRutinaService,
    obtenerRutinasCompletasService,
    obtenerRutinaCompletaPorIdService,
    actualizarRutinaService,
    eliminarRutinaService,
} from "../services/rutina.service.js";

export const obtenerRutinasCompletas = async (req, res) => {
    const {page, limit} = req.query;
    const rutinasObtenidas = await obtenerRutinasCompletasService(page, limit);
    res.json({ message: "Rutinas obtenidas", rutinas: rutinasObtenidas });
}

export const obtenerRutinaCompletaPorId = async (req, res) => {
    const { id } = req.params;
    const rutinaObtenida = await obtenerRutinaCompletaPorIdService(id);
    res.json({ message: `Rutina de ${rutinaObtenida.categoriaZonaMuscular.nombreCategoriaZona} obtenida con exito`, rutina: rutinaObtenida });
}

// Controladores para las rutinas
export const crearRutina = async (req, res) => {
    const { idUsuarioCreador } = req.body;
    const rutinaCreada = await createRutinaService(req.body, idUsuarioCreador);
    res.json({ message: "Rutina agregada exitosamente", ...rutinaCreada });
}

export const obtenerRutinas = async (req, res) => {
    const rutinasObtenidas = await obtenerRutinasService();
    res.json({ message: "Rutinas obtenidas", rutinas: rutinasObtenidas });
}

export const obtenerRutinaPorId = async (req, res) => {
    const { id } = req.params;
    const rutinaObtenida = await obtenerRutinaPorIdService(id);
    res.json({ message: `Rutina ${rutinaObtenida.id} obtenida con exito`, rutina: rutinaObtenida });
}

export const actualizarRutina = async (req, res) => {
    const { id } = req.params;
    const rutinaActualizada = await actualizarRutinaService(id, req.body);
    res.json({ message: `Rutina ${rutinaActualizada.id} actualizada exitosamente`, ...rutinaActualizada });
}

export const eliminarRutina = async (req, res) => {
    const { id } = req.params;
    const rutinaEliminada = await eliminarRutinaService(id);
    res.json({ message: `Rutina ${rutinaEliminada.id} eliminada exitosamente`, ...rutinaEliminada });
}