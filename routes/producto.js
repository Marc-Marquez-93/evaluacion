import { Router } from 'express';
import controller from '../controllers/producto.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";
import { upload } from '../helpers/multer.js';

const router = Router();

router.get('/productos', 
    [
        validarJWT,
        validarCampos
    ], controller.getProductos
);

router.get('/unProducto/:id', 
    [
        validarJWT,
        check("id", "No es un ID válido de MongoDB").isMongoId(),
        validarCampos
    ], controller.getProductosPorId
);

router.post('/crear', upload.single('imagenUrl'),
    [
        validarJWT,
        check("venderdorId", "El ID del vendedor es obligatorio y debe ser válido").isMongoId(),
        check("categoriaId", "El ID de la categoría es obligatorio y debe ser válido").isMongoId(),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("precio", "El precio debe ser un número mayor o igual a 0").isFloat({ min: 0 }),
        check("stock", "El stock debe ser un número entero mayor o igual a 0").isInt({ min: 0 }),
        check("descripcion", "La descripción debe ser texto").optional().isString(),
        validarCampos
    ], controller.crearProducto
);

router.put('/modificar/:id', upload.single('imagenUrl'),
    [
        validarJWT,
        check("id", "No es un ID válido de MongoDB").isMongoId(),
        check("venderdorId", "El ID del vendedor debe ser válido").optional().isMongoId(),
        check("categoriaId", "El ID de la categoría debe ser válido").optional().isMongoId(),
        check("nombre", "El nombre no puede estar vacío").optional().not().isEmpty(),
        check("precio", "El precio debe ser un número mayor o igual a 0").optional().isFloat({ min: 0 }),
        check("stock", "El stock debe ser un número entero mayor o igual a 0").optional().isInt({ min: 0 }),
        check("descripcion", "La descripción debe ser texto").optional().isString(),
        validarCampos
    ], controller.actualizarProducto
);

router.delete('/eliminar/:id', 
    [
        validarJWT,
        check("id", "No es un ID válido de MongoDB").isMongoId(),
        validarCampos
    ], controller.eliminarProducto
);

router.post('/CrearReseña/:id', 
    [
        validarJWT,
        check("id", "El ID del producto no es válido").isMongoId(),
        check("compradorId", "El ID del comprador es obligatorio y debe ser válido").isMongoId(),
        check("comentario", "El comentario es obligatorio para la reseña").not().isEmpty(),
        check("calificacion", "La calificación debe ser un número entre 1 y 5").isInt({ min: 1, max: 5 }),
        validarCampos
    ], controller.crearReseña
);

router.put('/actualizarReseña/:id', 
    [
        validarJWT,
        check("id", "El ID del producto no es válido").isMongoId(),
        check("reseñaId", "El ID de la reseña es obligatorio y debe ser válido").isMongoId(),
        check("comentario", "El comentario no puede estar vacío").optional().not().isEmpty(),
        check("calificacion", "La calificación debe ser un número entre 1 y 5").optional().isInt({ min: 1, max: 5 }),
        validarCampos
    ], controller.actualizarReseña
);

router.post('/CrearResumen/:id', 
    [
        validarJWT,
        check("id", "El ID del producto no es válido").isMongoId(),
        validarCampos
    ], controller.crearResumen
);

export default router;