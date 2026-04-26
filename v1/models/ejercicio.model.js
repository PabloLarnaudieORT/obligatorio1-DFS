import mongoose from "mongoose";

const ejercicioSchema = new mongoose.Schema({
    nombreEjercicio: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true
    },
    tipoDePeso: {
        type: String,
        enum: ["kilogramos", "libras"],
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    repeticiones:{
        type: Number,
        required: true
    },
    series:{
        type: Number,
        required: true
    },
    categoriaMusculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria Musculo",
        required: true
    },
    idUsuarioCreador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    }

});

export default mongoose.model("Ejercicio", ejercicioSchema);