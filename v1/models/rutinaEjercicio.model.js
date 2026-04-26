import mongoose from "mongoose";

const rutinaEjercicioSchema = new mongoose.Schema({
    idRutina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rutina",
        required: true
    },
    idEjercicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ejercicio",
        required: true
    }
});

export default mongoose.model("Rutina Ejercicio", rutinaEjercicioSchema);