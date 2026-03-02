import { Router } from 'express';
import controller from '../controllers/categoria.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get('/categorias', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.getCategorias
);

router.get('/categoria/:id', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.getCategoriaPorId
);

router.post('/crear', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.crearCategoria
);

router.put('/modificar/:id', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.actualizarCategoria
);

router.delete('/eliminar/:id', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.eliminarCategoria
);

export default router;