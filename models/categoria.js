import mongoose from "mongoose";

const categoria = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagenIcon: { type: String, required: true },
});

export default mongoose.model("Categoria", categoria);