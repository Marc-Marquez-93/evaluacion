import { Router } from "express";
import controller from "../controllers/usuario.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio y debe ser válido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  controller.loginUsuario,
);

router.get(
  "/usuarios",
  [
    validarJWT,
    validarCampos,
  ],
  controller.getUsuarios,
);

router.get(
  "/unUsuario/:id",
  [
    validarJWT,
    check("id", "No es un ID válido de MongoDB").isMongoId(),
    validarCampos,
  ],
  controller.getUsuariosPorId,
);

router.post(
  "/crear",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio y debe ser válido").isEmail(),
    check("password", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    check("rol", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  controller.crearUsuario,
);

router.put(
  "/modificar/:id",
  [
    validarJWT,
    check("id", "No es un ID válido de MongoDB").isMongoId(),
    check("nombre", "El nombre no puede estar vacío").optional().not().isEmpty(),
    check("email", "El email debe ser válido").optional().isEmail(),
    check("password", "La contraseña debe tener al menos 6 caracteres").optional().isLength({ min: 6 }),
    check("rol", "El rol no puede estar vacío").optional().not().isEmpty(),
    validarCampos,
  ],
  controller.actualizarUsuario,
);

router.delete(
  "/eliminar/:id",
  [
    validarJWT,
    check("id", "No es un ID válido de MongoDB").isMongoId(),
    validarCampos,
  ],
  controller.eliminarUsuario,
);

export default router;