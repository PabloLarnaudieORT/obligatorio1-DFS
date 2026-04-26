import joi from "joi";

export const crearProductoSchema = joi.object({
    nombreProducto: joi.string().required(),
    puntosRequeridos: joi.number().integer().positive().required(),
    beneficio: joi.string().required(),
});