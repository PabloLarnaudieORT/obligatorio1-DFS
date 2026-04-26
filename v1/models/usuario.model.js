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
    email: {
        type: String,
        unique: true,
        sparse: true
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
    edad:{
        type: Number,
    },
    altura:{
        type: Number,
    },
    peso:{
        type: Number,
    },
    puntosAcumulados:{
        type: Number,
        default: 0
    },

});

export default mongoose.model("Usuario", usuarioSchema);