import mongoose from "mongoose";

const usuarioProductoSchema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
    idProducto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
    },
    fechaCanje: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("UsuarioProducto", usuarioProductoSchema);