import mongoose from "mongoose";

const producto = new mongoose.Schema({
    venderdorId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria", required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    reseñas: [{ compradorId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }, comentario: {type: String}, calificacion: {type: Number, min: 1, max: 5} }],
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    imagenUrl: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});

export default mongoose.model("Producto", producto);