import mongoose from "mongoose";

const Usuario = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    estado: { type: Number, default: 1 }, //0 inactivo   1 activo
    rol: {type: String, enum: ['comprador', 'vendedor', 'admin'], required: true}, // 0 comprador, 1 vendedor, 2 admin
    fechaRegistro: { type: Date, default: Date.now }
});

export default mongoose.model("Usuario", Usuario);