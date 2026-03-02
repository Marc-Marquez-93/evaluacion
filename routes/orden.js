import { Router } from 'express';
import controller from '../controllers/orden.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get('/ordenes', 
    [
        validarJWT,
        validarCampos
    ], controller.getOrdenes
);

router.get('/orden/:id', 
    [
        validarJWT,
        check("id", "No es un ID válido de MongoDB").isMongoId(),
        validarCampos
    ], controller.getOrdenPorId
);

router.post('/crear', 
    [
        validarJWT,
        check("compradorId", "El compradorId es obligatorio y debe ser un ID válido").isMongoId(),
        check("vendedorId", "El vendedorId es obligatorio y debe ser un ID válido").isMongoId(),
        check("direccionEnvio", "La dirección de envío es obligatoria y debe tener mínimo 5 caracteres").isString().isLength({ min: 5 }),
        check("productos", "Debe enviar un arreglo (array) de productos con al menos un ítem").isArray({ min: 1 }),
        check("productos.*.productoId", "Cada producto debe tener un ID de MongoDB válido").isMongoId(),
        check("productos.*.cantidad", "La cantidad de cada producto debe ser un número entero mayor a 0").isInt({ min: 1 }),
        
        validarCampos
    ], controller.crearOrden
);

router.put('/actualizar/:id', 
    [
        validarJWT,
        check("id", "No es un ID válido de MongoDB").isMongoId(),
        check("direccionEnvio", "La dirección de envío debe tener al menos 5 caracteres").optional().isString().isLength({ min: 5 }),
        validarCampos
    ], controller.actualizarOrden
);

router.delete('/eliminar/:id', 
    [
        validarJWT,
        check("id", "No es un ID válido de MongoDB").isMongoId(),
        validarCampos
    ], controller.eliminarOrden
);

router.put('/estado/:id', 
    [
        validarJWT,
        check("id", "No es un ID válido de MongoDB").isMongoId(),
        check("estado", "El estado es obligatorio y debe ser un número entre 0 y 4").isInt({ min: 0, max: 4 }),
        validarCampos
    ], controller.actualizarEstado
);

export default router;