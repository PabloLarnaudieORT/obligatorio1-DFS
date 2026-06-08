import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    rol: {
        type: String,
        enum: ['admin', 'user'],
        required: true

    },
    plan: {
        type: String,
        enum: ['plus', 'premium'],
        default: 'plus'
    },
    edad: {
        type: Number,
    },
    altura: {
        type: Number,
    },
    peso: {
        type: Number,
    },
    fotoPerfil: {
        type: String,
        default: ""
    },

});

export default mongoose.model("Usuario", usuarioSchema);