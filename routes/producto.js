import { Router } from 'express';
import controller from '../controllers/producto.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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

router.post('/crear', 
    [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ], controller.crearProducto
);

router.put('/modificar/:id', 
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