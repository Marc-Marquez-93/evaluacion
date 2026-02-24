import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import productoRoutes from './routes/productoRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import ordenRoutes from './routes/ordenRoutes.js';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/categorias', categoriaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ordenes', ordenRoutes);

// Start the server
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server escuchando en puerto: ${PORT}`);
})