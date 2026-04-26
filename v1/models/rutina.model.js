import mongoose from "mongoose";
//import categoriaZonaMuscularModel from "./categoriaZonaMusculos.model.js";

const rutinaSchema = new mongoose.Schema({
    idUsuarioCreador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    categoriaZonaMuscular : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria Zona Muscular",
        required: true
    },

    fechaCreacion: {
        type: Date,
        default: Date.now
    }


});

export default mongoose.model("Rutina", rutinaSchema);