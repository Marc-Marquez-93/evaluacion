import { Router } from "express";
import controller from "../controllers/usuario.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ],
  controller.loginUsuario,
);

router.get(
  "/usuarios",
  [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ],
  controller.getUsuarios,
);

router.get(
  "/unUsuario/:id",
  [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ],
  controller.getUsuariosPorId,
);

router.post(
  "/crear",
  [
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ],
  controller.crearUsuario,
);

router.put(
  "/modificar/:id",
  [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ],
  controller.actualizarUsuario,
);

router.delete(
  "/eliminar/:id",
  [
    validarJWT,
    check("email").isEmail().withMessage("El email debe ser válido"),
    validarCampos,
  ],
  controller.eliminarUsuario,
);

export default router;
