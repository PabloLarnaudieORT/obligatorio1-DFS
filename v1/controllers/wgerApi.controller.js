import {
    obtenerEjerciciosWgerService,
    obtenerEjercicioPorIdWgerService,
    obtenerCategoriasMusculosWgerService,
} from "../services/wgerApi.service.js";

export const obtenerEjerciciosWger = async (req, res) => {
    const { limit, offset, language } = req.query;
    const ejercicios = await obtenerEjerciciosWgerService({ limit, offset, language });
    res.json({ message: "Ejercicios obtenidos desde Wger", total: ejercicios.count, ejercicios: ejercicios.results });
};

export const obtenerEjercicioPorIdWger = async (req, res) => {
    const { id } = req.params;
    const ejercicio = await obtenerEjercicioPorIdWgerService(id);
    res.json({ message: `Ejercicio ${id} obtenido desde Wger`, ejercicio });
};

export const obtenerMusculosWger = async (req, res) => {
    const musculos = await obtenerCategoriasMusculosWgerService();
    res.json({ message: "Músculos obtenidos desde Wger", total: musculos.count, musculos: musculos.results });
};

