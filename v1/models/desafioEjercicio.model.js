import mongoose from "mongoose";

const desafioEjercicioSchema = new mongoose.Schema({
    idDesafio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Desafio",
        required: true
    },
    idEjercicios: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ejercicio",
        required: true
    }
});

export default mongoose.model("Desafio Ejercicio", desafioEjercicioSchema);