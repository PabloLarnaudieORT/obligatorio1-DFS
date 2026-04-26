import mongoose from "mongoose";

const categoriaMusculosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true 
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Categoria Músculos", categoriaMusculosSchema);