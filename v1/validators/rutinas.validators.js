import Joi from "joi";

export const crearRutinaSchema = Joi.object({
    categoriaZonaMuscular : Joi.string().required()
});
