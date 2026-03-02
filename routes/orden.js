import { Router } from 'express';
import controller from '../controllers/orden.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get('/ordenes', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.getOrdenes
);

router.get('/orden/:id', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.getOrdenPorId
);

router.post('/crear', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.crearOrden
);

router.put('/actualizar/:id', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.actualizarOrden
);

router.delete('/eliminar/:id', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.eliminarOrden
);

router.put('/estado/:id/:estado', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.actualizarEstado
);

export default router;