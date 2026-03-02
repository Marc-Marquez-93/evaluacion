import Producto from "../models/producto.js";
import llamarGemini from "../utils/ia.js";

const productoController = {
  getProductos: async (req, res) => {
    try {
      // .populate() nos sirve para traer la info completa del vendedor y no solo su ID
      const productos = await Producto.find()
        .populate("venderdorId", "nombre email")
        .populate("categoriaId", "nombre");

      res.status(200).json({ productos });
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Error al obtener los productos",
          detalle: error.message,
        });
    }
  },

  getProductosPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findById(id)
        .populate("venderdorId", "nombre email")
        .populate("categoriaId", "nombre");

      if (!producto) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }

      res.status(200).json({ producto });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al buscar el producto", detalle: error.message });
    }
  },

  crearProducto: async (req, res) => {
    try {
      const { venderdorId, categoriaId, nombre, precio, stock } = req.body;
      let { descripcion } = req.body;

      // Multer nos dejará la ruta de la imagen en req.file.path
      const imagenUrl = req.file ? req.file.path : "";

      if (!imagenUrl) {
        return res.status(400).json({ msg: "La imagen es obligatoria" });
      }

      // 🤖 Integración de Gemini: Si el cliente no envía descripción, la IA la crea
      if (!descripcion || descripcion.trim() === "") {
        const prompt = `Actúa como un experto en marketing. Escribe una descripción comercial, atractiva y directa (máximo 3 líneas) para un producto llamado "${nombre}".`;
        const descripcionIA = await llamarGemini(prompt);

        // Si la IA falla por alguna razón, ponemos un texto por defecto
        descripcion =
          descripcionIA || "Descripción no disponible por el momento.";
      }

      const nuevoProducto = new Producto({
        venderdorId,
        categoriaId,
        nombre,
        descripcion,
        precio,
        stock,
        imagenUrl,
      });

      await nuevoProducto.save();

      res
        .status(201)
        .json({ msg: "Producto creado exitosamente", producto: nuevoProducto });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al crear el producto", detalle: error.message });
    }
  },

  actualizarProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      // Si el frontend envía una nueva imagen mediante Multer, actualizamos la ruta
      if (req.file) {
        data.imagenUrl = req.file.path;
      }

      const productoActualizado = await Producto.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!productoActualizado) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }

      res
        .status(200)
        .json({ msg: "Producto actualizado", producto: productoActualizado });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al actualizar", detalle: error.message });
    }
  },

  eliminarProducto: async (req, res) => {
    try {
      const { id } = req.params;
      const productoEliminado = await Producto.findByIdAndDelete(id);

      if (!productoEliminado) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }

      res.status(200).json({ msg: "Producto eliminado correctamente" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al eliminar", detalle: error.message });
    }
  },

  crearReseña: async (req, res) => {
    try {
      const { id } = req.params;
      const { compradorId, comentario, calificacion } = req.body;

      const producto = await Producto.findById(id);
      if (!producto) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }

      producto.reseñas.push({ compradorId, comentario, calificacion });
      await producto.save();

      res.status(201).json({ msg: "Reseña agregada con éxito", producto });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al crear reseña", detalle: error.message });
    }
  },

  actualizarReseña: async (req, res) => {
    try {
      const { id } = req.params;
      const { reseñaId, comentario, calificacion } = req.body;

      const producto = await Producto.findOneAndUpdate(
        { _id: id, "reseñas._id": reseñaId },
        {
          $set: {
            "reseñas.$.comentario": comentario,
            "reseñas.$.calificacion": calificacion,
          },
        },
        { new: true },
      );

      if (!producto) {
        return res
          .status(404)
          .json({ msg: "Producto o reseña no encontrados" });
      }

      res.status(200).json({ msg: "Reseña actualizada", producto });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al actualizar reseña", detalle: error.message });
    }
  },
  crearResumen: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findById(id);

      if (!producto) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }

      if (!producto.reseñas || producto.reseñas.length === 0) {
        return res
          .status(400)
          .json({ msg: "Este producto aún no tiene reseñas para analizar." });
      }

      const comentarios = producto.reseñas
        .map((r) => r.comentario)
        .filter((c) => c) 
        .join("\n- ");

      if (!comentarios) {
        return res
          .status(400)
          .json({
            msg: "Las reseñas actuales no contienen texto útil para el resumen.",
          });
      }

      const prompt = `
Actúa como un analista experto en experiencia del cliente, con un tono amable, empático y objetivo.
A continuación te presento los comentarios reales de los compradores sobre el producto "${producto.nombre}".

Por favor, lee los comentarios y elabora un resumen corto y atractivo (máximo 3 párrafos) que responda a esto:
1. ¿Qué es lo que más le gusta a la gente de este producto? (Puntos fuertes).
2. ¿Hay alguna queja recurrente o área de mejora? (Sé honesto pero constructivo).
3. Conclusión sobre el sentimiento general: ¿Recomiendan comprarlo o no?

Aquí están los comentarios de los clientes:
- ${comentarios}
            `;

      const resumenIA = await llamarGemini(prompt);

      if (!resumenIA) {
        return res
          .status(500)
          .json({
            msg: "La IA está descansando. No se pudo generar el resumen.",
          });
      }

      res.status(200).json({
        msg: "Resumen generado exitosamente",
        producto: producto.nombre,
        resumen: resumenIA,
      });
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Error interno al crear el resumen",
          detalle: error.message,
        });
    }
  },
};
export default productoController;
