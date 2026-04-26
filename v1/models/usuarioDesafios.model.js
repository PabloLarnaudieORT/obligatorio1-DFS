import mongoose from "mongoose";

const usuarioDesafiosSchema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    idDesafio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Desafio",
        required: true
    },
    estado: {
        type: String,
        enum: ["en curso", "finalizado"],
        required: true
    },
    fechaInicio: {
        type: Date,
        default: Date.now,
        required: true
    },
    fechaFinalizado: {
        type: Date,
        default: function () {
            return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 días después de la creación
        }
    }

});

export default mongoose.model("Usuario Desafios", usuarioDesafiosSchema);