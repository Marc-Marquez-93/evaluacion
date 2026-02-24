import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { conectarDB } from './config/db.js';
import categoriaRoutes from './routes/categoria.js';
import productoRoutes from './routes/producto.js';
import usuarioRoutes from './routes/usuario.js';
import ordenRoutes from './routes/orden.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
conectarDB();

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