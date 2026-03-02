import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { conectarDB } from './config/db.js';
import categoriaRoutes from './routes/categoria.js';
import productoRoutes from './routes/producto.js';
import usuarioRoutes from './routes/usuario.js';
import ordenRoutes from './routes/orden.js';

const app = express();

// const corsOptions = {
//   origin: 'http://localhost:5173', 
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   optionsSuccessStatus: 200 
// };
// app.use(cors(corsOptions));

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
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