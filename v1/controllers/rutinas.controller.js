import {
  createRutinaService,
  obtenerRutinasCompletasService,
  obtenerRutinasPorZonaService,
  obtenerRutinaCompletaPorIdService,
  actualizarRutinaService,
  eliminarRutinaService,
} from "../services/rutina.service.js";

export const obtenerRutinasCompletas = async (req, res) => {
  try {
    const { page, limit, zona } = req.query;

    const userId = req.user?.id;
    const userRol = req.user?.rol;

    if (zona) {
      /*
      const rutinasPorZona =
        await obtenerRutinasPorZonaService(zona);
        */

      const userIdFilter = userRol === "admin" ? null : userId;

      const rutinasPorZona = await obtenerRutinasPorZonaService(
        zona,
        userIdFilter,
      );

      return res.json({
        message: "Rutinas filtradas por zona muscular",
        rutinas: rutinasPorZona,
      });
    }

    const userIdFilter = userRol === "admin" ? null : userId;

    const rutinasObtenidas = await obtenerRutinasCompletasService(
      page,
      limit,
      userIdFilter,
    );

    res.json({
      message: "Rutinas obtenidas",
      rutinas: rutinasObtenidas,
    });
  } catch (error) {
    console.log("ERROR RUTINAS:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const obtenerRutinaCompletaPorId = async (req, res) => {
  const { id } = req.params;
  const rutinaObtenida = await obtenerRutinaCompletaPorIdService(id);
  res.json({
    message: `Rutina de ${rutinaObtenida.categoriaZonaMuscular.nombreCategoriaZona} obtenida con exito`,
    rutina: rutinaObtenida,
  });
};

// Controladores para las rutinas
export const crearRutina = async (req, res) => {
  try {
    console.log("BODY:");
    console.log(req.body);

    console.log("USER:");
    console.log(req.user);

    const rutinaCreada = await createRutinaService(req.body, req.user.id);

    res.json({
      message: "Rutina agregada exitosamente",
      ...rutinaCreada,
    });
  } catch (error) {
    console.log("ERROR CREAR RUTINA");
    console.log(error);

    res.status(error.status || 500).json({
      message: error.message,
      details: error.details,
    });
  }
};

export const obtenerRutinas = async (req, res) => {
  const rutinasObtenidas = await obtenerRutinasService();
  res.json({ message: "Rutinas obtenidas", rutinas: rutinasObtenidas });
};

export const obtenerRutinaPorId = async (req, res) => {
  const { id } = req.params;
  const rutinaObtenida = await obtenerRutinaPorIdService(id);
  res.json({
    message: `Rutina ${rutinaObtenida.id} obtenida con exito`,
    rutina: rutinaObtenida,
  });
};

export const actualizarRutina = async (req, res) => {
  const { id } = req.params;
  const rutinaActualizada = await actualizarRutinaService(id, req.body);
  res.json({
    message: `Rutina ${rutinaActualizada.id} actualizada exitosamente`,
    ...rutinaActualizada,
  });
};

export const eliminarRutina = async (req, res) => {
  const { id } = req.params;
  const rutinaEliminada = await eliminarRutinaService(id);
  res.json({
    message: `Rutina ${rutinaEliminada.id} eliminada exitosamente`,
    ...rutinaEliminada,
  });
};
