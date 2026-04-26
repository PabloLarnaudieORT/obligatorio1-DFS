import mongoose from "mongoose";

const desafioSchema = new mongoose.Schema({
    nombreDesafio: {
        type: String,
        required: true,
        unique: true 
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
        required: true
    },
    fechaLimite: {
        type: Date,
        default: function() {
            return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 días después de la creación
        }
    },
    puntosDesafio: {
        type: Number,
        required: true
    },
    categoriaZonaMuscular: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria Zona Muscular",
        required: true,
    }
});

export default mongoose.model("Desafio", desafioSchema);