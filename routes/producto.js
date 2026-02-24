import { Router } from 'express';
import controller from '../controllers/producto.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';

const router = Router();

router.get('/productos', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.getProductos
);

router.get('/unProducto/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.getProductosPorId
);

router.post('/crear', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.crearProducto
);

router.put('/modificar/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.actualizarProducto
);

router.delete('/eliminar/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.eliminarProducto
);

router.post('/CrearReseña/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.crearReseña
);

router.put('/actualizarReseña/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.actualizarReseña
);

export default router;