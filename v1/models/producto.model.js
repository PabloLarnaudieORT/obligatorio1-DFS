import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    puntosRequeridos: {
        type: Number,
        required: true,
    },
    nombreProducto: {
        type: String,
        required: true,
    },
    beneficio: {
        type: String,
        required: true,
    }
    //AGREGAR COSTOPUNTOS
    // LLEVA TABLA INTERMEDIA CON USUARIO - CANJE(IDUSU, IDPROD, FECHAcANJE)
});

export default mongoose.model("Producto", productoSchema);