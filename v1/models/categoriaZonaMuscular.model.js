import mongoose from "mongoose";

const categoriaZonaMuscularSchema = new mongoose.Schema({
    nombreCategoriaZona: {
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

export default mongoose.model("Categoria Zona Muscular", categoriaZonaMuscularSchema);