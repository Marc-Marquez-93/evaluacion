import mongoose from "mongoose";

const orden = new mongoose.Schema({
    compradorId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    vendedorId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    productos: [{
        productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
        cantidad: { type: Number, required: true, default: 1 },
        precioUnitario: { type: Number, required: true } 
    }],
    direccionEnvio: { type: String, required: true },
    total: { type: Number, required: true },
    fechaOrden: { type: Date, default: Date.now },
    estado: {type: String, enum: ["pendiente", "pagada", "enviada", "entregada", "cancelada"], default: "pendiente"}, 
});

export default mongoose.model("Ordene", orden);