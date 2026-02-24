import { Router } from 'express';
import controller from '../controllers/orden.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';

const router = Router();

router.get('/ordenes', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.getOrdenes
);

router.get('/orden/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.getOrdenPorId
);

router.post('/crear/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.crearOrden
);

router.put('/actualizar/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.actualizarOrden
);

router.delete('/eliminar/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.eliminarOrden
);

router.put('/estado/:id/:estado', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.actualizarEstado
);

export default router;