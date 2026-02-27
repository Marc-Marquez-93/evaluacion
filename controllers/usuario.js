import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { parseRol, parseEstado } from "../helpers/usuario.js";
import { generarJWT } from "../helpers/generar-jwt.js";

const usuarioController = {
  loginUsuario: async (req, res) => {
    const { email, password } = req.body;

    try {
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos - correo",
        });
      }

      if (usuario.estado === 0) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos - estado: false",
        });
      }

      const validPassword = bcryptjs.compareSync(password, usuario.password);
      if (!validPassword) {
        return res.status(400).json({
          msg: "Usuario / Password no son correctos - password",
        });
      }

      const token = await generarJWT(usuario._id);

      res.json({
        msg: "login hecho correctamente",
        usuario,
        token,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Hable con el administrador (Error interno en el login)",
      });
    }
  },
  getUsuarios: async (req, res) => {
    try {
      const listado = await Usuario.find();

      res.json({ listado });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  getUsuariosPorId: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await Usuario.findOne({ _id: id });

      if (!user) {
        return res.status(400).json({
          msg: "usuario no registrado en el sistema",
        });
      }

      res.status(200).json({
        msg: "usuario encontrado",
        user,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  crearUsuario: async (req, res) => {
    try {
      const { nombre, email, password, estado, rol, adminCode } = req.body;

      const Nrol = parseRol(rol);

      if (Nrol === "admin") {
        if (adminCode !== process.env.ADMIN_SECRET_KEY) {
          return res.status(401).json({
            msg: "No tienes autorización para crear una cuenta de administrador. Código incorrecto.",
          });
        }
      }

      const usuario = new Usuario({
        nombre,
        password,
        email,
        estado,
        rol: Nrol,
      });

      const salt = bcryptjs.genSaltSync(10);
      usuario.password = bcryptjs.hashSync(password, salt);

      await usuario.save();

      res.status(200).json({ msg: "usuario creado correctamente", usuario });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          msg: "El correo ya está registrado en el sistema",
        });
      }

      res.status(500).json({
        msg: "Hable con el administrador (Error interno en el login)",
      });
    }
  },
  actualizarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, email, password, estado, rol, adminCode } = req.body;

      const user = await Usuario.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }

      const Nrol = parseRol(rol);

      if (Nrol === "admin") {
        if (adminCode !== process.env.ADMIN_SECRET_KEY) {
          return res.status(401).json({
            msg: "No tienes autorización para actualizar una cuenta de administrador. Código incorrecto.",
          });
        }
      }

      let newPassword = user.password;
      if (password) {
        const salt = bcryptjs.genSaltSync(10);
        newPassword = bcryptjs.hashSync(password, salt);
      }

      const usuarioActualizado = await Usuario.findByIdAndUpdate(
        id,
        { nombre, email, password: newPassword, rol: Nrol, estado },
        { new: true },
      );
      res.status(200).json({
        msg: "Usuario actualizado correctamente",
        usuario: usuarioActualizado,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  eliminarUsuario: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await Usuario.findById(id);
      if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }

      await Usuario.findByIdAndDelete(id);

      res.status(200).json({ msg: "Usuario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ msg: "Error al eliminar", error });
    }
  },
};

export default usuarioController;
