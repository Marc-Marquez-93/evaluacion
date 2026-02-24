import mongoose from "mongoose";

export const conectarDB = async () => {
    try {
        (await mongoose.connect(process.env.MONGO_URI)).then(() => {
            console.log("Conexión a MongoDB exitosa");
        });
    }
    catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1); // Salir del proceso con error
    }
}