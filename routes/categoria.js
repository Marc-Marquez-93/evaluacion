import { Router } from 'express';
import controller from '../controllers/categoria.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";
import { upload } from '../helpers/multer.js';

const router = Router();

router.get('/categorias', 
    [
        validarJWT,
        validarCampos
    ], controller.getCategorias
);

router.get('/categoria/:id', 
    [
        validarJWT,
        check("id", "No es un ID válido de MongoDB").isMongoId(),
        validarCampos
    ], controller.getCategoriaPorId
);

router.post('/crear', upload.single('imagenIcon'),
    [
        validarJWT,
        check("nombre", "El nombre de la categoría es obligatorio").not().isEmpty(),
        check("nombre", "El nombre debe ser un texto válido").isString(),
        check("descripcion", "La descripción debe ser un texto").optional().isString(),
        validarCampos
    ], controller.crearCategoria
);

router.put('/modificar/:id', upload.single('imagenIcon'),
    [
        validarJWT,
        check("id", "No es un ID válido de MongoDB").isMongoId(),
        check("nombre", "El nombre no puede estar vacío").optional().not().isEmpty(),
        check("nombre", "El nombre debe ser un texto").optional().isString(),
        check("descripcion", "La descripción debe ser un texto").optional().isString(),
        validarCampos
    ], controller.actualizarCategoria
);

router.delete('/eliminar/:id', 
    [
        validarJWT,
        check("id", "No es un ID válido de MongoDB").isMongoId(),
        validarCampos
    ], controller.eliminarCategoria
);

export default router;