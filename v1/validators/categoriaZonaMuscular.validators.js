import Joi from "joi";

export const crearCategoriaZonaMuscularSchema = Joi.object({
    nombreCategoriaZona: Joi.string().required(),
});