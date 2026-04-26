
import {
    createRutinaEjercicioService,
    obtenerRutinasEjercicioService,
    obtenerRutinaEjercicioPorIdService,
    actualizarRutinaEjercicioService,
    eliminarRutinaEjercicioService
} from "../services/rutinaEjercicio.service.js";

// Controladores para las rutinas
export const crearRutinaEjercicio = async (req, res) => {
    const rutinaCreada = await createRutinaEjercicioService(req.body);
    res.json({ message: "Rutina agregada exitosamente", ...rutinaCreada });
}

export const obtenerRutinasEjercicio = async (req, res) => {
    const rutinasObtenidas = await obtenerRutinasEjercicioService();
    res.json({ message: "Rutinas obtenidas", rutinas: rutinasObtenidas });
}

export const obtenerRutinaEjercicioPorId = async (req, res) => {
    const { id } = req.params;
    const rutinaObtenida = await obtenerRutinaEjercicioPorIdService(id);
    res.json({ message: `Rutina ${rutinaObtenida.id} obtenida con exito`, rutina: rutinaObtenida });
}

export const actualizarRutinaEjercicio = async (req, res) => {
    const { id } = req.params;
    const rutinaActualizada = await actualizarRutinaEjercicioService(id, req.body);
    res.json({ message: `Rutina ${rutinaActualizada.id} actualizada exitosamente`, ...rutinaActualizada });
}

export const eliminarRutinaEjercicio = async (req, res) => {
    const { id } = req.params;
    const rutinaEliminada = await eliminarRutinaEjercicioService(id);
    res.json({ message: `Rutina ${rutinaEliminada.id} eliminada exitosamente`, ...rutinaEliminada });
}