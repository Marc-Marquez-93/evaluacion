import mongoose from "mongoose";

const usuario = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: {type: Number, required: true}, // 0 comprador, 1 vendedor, 2 admin
    fechaRegistro: { type: Date, default: Date.now }
});

export default mongoose.model("Usuario", usuario);