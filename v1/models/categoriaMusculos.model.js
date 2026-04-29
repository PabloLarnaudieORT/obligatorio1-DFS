import mongoose from "mongoose";

const categoriaMusculosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true 
    },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("CategoriaMusculo", categoriaMusculosSchema);