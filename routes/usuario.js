import { Router } from 'express';

import UsuarioController from '../controllers/UsuarioController.js';
import { validacionCrearUsuario, validacionParametroId } from '../middlewares/validaciones.js';

const router = Router();

// POST /api/usuarios - Crear usuario
router.post('/', validacionCrearUsuario, UsuarioController.crear);
// GET /api/usuarios - Listar usuarios
router.get('/', UsuarioController.listar);
// GET /api/usuarios/:id - Obtener usuario por ID
router.get('/:id', validacionParametroId, UsuarioController.obtener);

export default router;