import { Router } from 'express';
import controller from '../controllers/producto.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";
import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/productos', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.getProductos
);

router.get('/unProducto/:id', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.getProductosPorId
);

router.post('/crear', upload.single('imagenUrl'),
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.crearProducto
);

router.put('/modificar/:id', upload.single('imagenUrl'),
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.actualizarProducto
);

router.delete('/eliminar/:id', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.eliminarProducto
);

router.post('/CrearReseña/:id', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.crearReseña
);

router.put('/actualizarReseña/:id', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.actualizarReseña
);

router.post('/CrearResumen/:id', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.crearResumen
);

export default router;