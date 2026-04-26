import axios from "axios";

//mover a .env
const WGER_BASE_URL = "https://wger.de/api/v2";

export const obtenerEjerciciosWgerService = async (params = {}) => {
    try {
        const response = await axios.get(`${WGER_BASE_URL}/exercise/`, {
            params: {
                language: 2, // Español
                limit: 20,
                ...params
            }
        });
        return response.data;
    } catch (error) {
        const err = new Error("Error al obtener ejercicios de Wger");
        err.status = 500;
        err.details = error.message;
        throw err;
    }
};

export const obtenerEjercicioPorIdWgerService = async (id) => {
    try {
        const response = await axios.get(`${WGER_BASE_URL}/exercise/${id}/`);
        return response.data;
    } catch (error) {
        const err = new Error(`Error al obtener ejercicio ${id} de Wger`);
        err.status = 500;
        err.details = error.message;
        throw err;
    }
};

export const obtenerCategoriasMusculosWgerService = async () => {
    try {
        const response = await axios.get(`${WGER_BASE_URL}/muscle/`);
        return response.data;
    } catch (error) {
        const err = new Error("Error al obtener músculos de Wger");
        err.status = 500;
        err.details = error.message;
        throw err;
    }
};