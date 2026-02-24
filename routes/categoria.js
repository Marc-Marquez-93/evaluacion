import { Router } from 'express';
import controller from '../controllers/categoria.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validarCampos.js';

const router = Router();

router.get('/categorias', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.getCategorias
);

router.get('/categoria/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.getCategoriaPorId
);

router.post('/crear', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.crearCategoria
);

router.put('/modificar/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.actualizarCategoria
);

router.delete('/eliminar/:id', 
    [check('email').isEmail().withMessage('El email debe ser válido'),
        validarCampos,
    ], controller.eliminarCategoria
);

export default router;