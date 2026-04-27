import Producto from "../models/producto.model.js";
import { isValidObjectId } from "mongoose";

export const crearProductoService = async (producto) => {
    try {
        const nuevoProducto = new Producto(producto);  
        await nuevoProducto.save();
        return JSON.parse(JSON.stringify(nuevoProducto));
    } catch (error) {
        const err = new Error("Error al crear el producto");
        err.status = error.name === "ValidationError" ? 400 : 500;      
        err.details = error.errors || error.message;
        throw err;
    }   
}
export const obtenerProductosService = async (page, limit) => {
    try {
        limit = Number(limit) || 5; // Valor predeterminado de 5 si no se proporciona
        page = Number(page) || 1;
        const skip = (page - 1) * limit;
        const cantidadProductos = await Producto.countDocuments();
        const totalPages = Math.ceil(cantidadProductos / limit);
        
        const productos = await Producto.find().skip(skip).limit(limit);
       
        return {  totalProductos: cantidadProductos, totalPages, currentPage: page , productos,};
    } catch (error) {
        throw new Error("Error al obtener los productos");
    }       

}

export const obtenerProductoPorIdService = async (id) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }

    const producto = await Producto.findById(id);

    if (!producto) {   
        const errorId = new Error("Producto no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   
    return producto;
}

export const actualizarProductoService = async (id, data) => {
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const producto = await Producto.findById(id);

    if (!producto) {    
        const errorId = new Error("Producto no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }   

    const productoActualizado = await Producto.findByIdAndUpdate(id, data, { returnDocument: "after" });
    return productoActualizado;
    }

export const eliminarProductoService = async (id) => {
    
    if (!isValidObjectId(id)) {
        const errorId = new Error("Id no válido");
        errorId.status = 400;
        errorId.details = { id };
        throw errorId;
    }   

    const producto = await Producto.findById(id);

    if (!producto) {    
        const errorId = new Error("Producto no encontrado");
        errorId.status = 404;
        errorId.details = { id };
        throw errorId;
    }

    const productoEliminado = await Producto.findByIdAndDelete(id);
    return productoEliminado;
}