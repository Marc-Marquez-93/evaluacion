import Orden from "../models/orden.js";
import Producto from "../models/producto.js";
import { parseEstado } from "../helpers/usuario.js"; 

const ordenController = {
  getOrdenes: async (req, res) => {
    try {
      const ordenes = await Orden.find()
        .populate("compradorId", "nombre email")
        .populate("vendedorId", "nombre email")
        .populate("productos.productoId", "nombre precio imagenUrl");

      res.status(200).json({ ordenes });
    } catch (error) {
      res.status(500).json({
        error: "Error al obtener las órdenes",
        detalle: error.message,
      });
    }
  },

  getOrdenPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const orden = await Orden.findById(id)
        .populate("compradorId", "nombre email")
        .populate("vendedorId", "nombre email")
        .populate("productos.productoId", "nombre precio imagenUrl");

      if (!orden) {
        return res.status(404).json({ msg: "Orden no encontrada" });
      }

      res.status(200).json({ orden });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la orden", detalle: error.message });
    }
  },

  crearOrden: async (req, res) => {
    try {
      const { compradorId, vendedorId, productos, direccionEnvio } = req.body;

      let totalOrden = 0;
      const productosValidados = [];

      for (let item of productos) {
        const productoDB = await Producto.findById(item.productoId);

        if (!productoDB) {
          return res.status(404).json({ msg: `El producto con ID ${item.productoId} no existe` });
        }
        if (productoDB.stock < item.cantidad) {
          return res.status(400).json({
              msg: `Stock insuficiente para ${productoDB.nombre}. Quedan: ${productoDB.stock}`,
            });
        }

        totalOrden += productoDB.precio * item.cantidad;

        productosValidados.push({
          productoId: productoDB._id,
          cantidad: item.cantidad,
          precioUnitario: productoDB.precio,
        });

        productoDB.stock -= item.cantidad;
        await productoDB.save();
      }

      const nuevaOrden = new Orden({
        compradorId,
        vendedorId,
        productos: productosValidados,
        direccionEnvio,
        total: totalOrden,
        estado: "pendiente", 
      });

      await nuevaOrden.save();
      res.status(201).json({ msg: "Orden creada exitosamente", orden: nuevaOrden });
    } catch (error) {
      res.status(500).json({ error: "Error al crear la orden", detalle: error.message });
    }
  },

  actualizarOrden: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body; 

      delete data.total;
      delete data.productos;
      delete data.estado; 

      const ordenActualizada = await Orden.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!ordenActualizada) {
        return res.status(404).json({ msg: "Orden no encontrada" });
      }

      res.status(200).json({ msg: "Orden actualizada", orden: ordenActualizada });
    } catch (error) {
      res.status(500).json({
          error: "Error al actualizar la orden",
          detalle: error.message,
        });
    }
  },

  eliminarOrden: async (req, res) => {
    try {
      const { id } = req.params;
      const ordenEliminada = await Orden.findByIdAndDelete(id);

      if (!ordenEliminada) {
        return res.status(404).json({ msg: "Orden no encontrada" });
      }

      res.status(200).json({ msg: "Orden eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la orden", detalle: error.message });
    }
  },

  actualizarEstado: async (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.body; // Viene como un número (0, 1, 2, 3, 4)

      const estadoParseado = parseEstado(estado); 

      if (!estadoParseado) {
        return res.status(400).json({
            msg: "Estado no válido. Use un número del 0 al 4.",
          });
      }

      const ordenActualizada = await Orden.findByIdAndUpdate(
        id,
        { estado: estadoParseado }, 
        { new: true },
      );

      if (!ordenActualizada) {
        return res.status(404).json({ msg: "Orden no encontrada" });
      }

      res.status(200).json({
          msg: `Estado de la orden actualizado a: ${estadoParseado}`,
          orden: ordenActualizada,
        });
    } catch (error) {
      res.status(500).json({
          error: "Error al actualizar el estado",
          detalle: error.message,
        });
    }
  },
};

export default ordenController;