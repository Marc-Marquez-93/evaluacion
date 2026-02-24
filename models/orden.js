import mongoose from "mongoose";

const orden = new mongoose.Schema({
    compradorId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    total: { type: Number, required: true },
    fechaOrden: { type: Date, default: Date.now },
    estado: {type: Number, required: true}, // 0 pendiente, 1 pagada, 2 enviada, 3 entregada, 4 cancelada
});

export default mongoose.model("Orden", orden);