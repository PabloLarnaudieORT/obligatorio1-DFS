import Joi from "joi";

export const editarDesafiosSchema = Joi.object({
  nombreDesafio: Joi.string().min(2).max(100).optional(),
  fechaLimite: Joi.date().optional(),
  puntosDesafio: Joi.number().min(0).max(10000).optional(),
  categoriaZonaMuscular: Joi.string().optional(),
});

export const crearDesafiosSchema = Joi.object({
  nombreDesafio: Joi.string().min(2).max(100).required(),
  fechaCreacion: Joi.date().required(),
  fechaLimite: Joi.date().min(Joi.ref("fechaCreacion")).required(),
  puntosDesafio: Joi.number().min(0).max(10000).required(),
  categoriaZonaMuscular: Joi.string().required(),
});
