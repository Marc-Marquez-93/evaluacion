import Categoria from '../models/categoria.js';
import llamarGemini from '../utils/ia.js';

const categoriaController = {
    getCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.find();
            res.status(200).json({ categorias });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las categorías", detalle: error.message });
        }
    },

    getCategoriaPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const categoria = await Categoria.findById(id);

            if (!categoria) {
                return res.status(404).json({ msg: "Categoría no encontrada" });
            }

            res.status(200).json({ categoria });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la categoría", detalle: error.message });
        }
    },

    crearCategoria: async (req, res) => {
        try {
            const { nombre } = req.body;
            let { descripcion } = req.body;

            const imagenIcon = req.file ? req.file.path : "";

            const existeCategoria = await Categoria.findOne({ nombre });
            if (existeCategoria) return res.status(400).json({ msg: "Esa categoría ya existe" });

            if (!imagenIcon) {
                return res.status(400).json({ msg: "El icono/imagen de la categoría es obligatorio" });
            }

            if (!descripcion || descripcion.trim() === "") {
                const prompt = `Actúa como un experto en comercio electrónico. Escribe una descripción breve y atractiva (máximo 2 líneas) para una categoría de productos llamada "${nombre}". Importante, decide tu un discurso, me estas describiendo la categoria con tus conocimientos, no debes esperar mi opinion`;
                const descripcionIA = await llamarGemini(prompt);

                descripcion = descripcionIA || "Categoría de productos del marketplace.";
            }

            const nuevaCategoria = new Categoria({
                nombre,
                descripcion,
                imagenIcon
            });

            await nuevaCategoria.save();

            res.status(201).json({ msg: "Categoría creada con éxito", categoria: nuevaCategoria });
        } catch (error) {
            res.status(500).json({ error: "Error al crear la categoría", detalle: error.message });
        }
    },

    actualizarCategoria: async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;

            if (req.file) {
                data.imagenIcon = req.file.path;
            }

            const categoriaActualizada = await Categoria.findByIdAndUpdate(id, data, { new: true });

            if (!categoriaActualizada) {
                return res.status(404).json({ msg: "Categoría no encontrada" });
            }

            res.status(200).json({ msg: "Categoría actualizada", categoria: categoriaActualizada });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar la categoría", detalle: error.message });
        }
    },

    eliminarCategoria: async (req, res) => {
        try {
            const { id } = req.params;
            const categoriaEliminada = await Categoria.findByIdAndDelete(id);

            if (!categoriaEliminada) {
                return res.status(404).json({ msg: "Categoría no encontrada" });
            }

            res.status(200).json({ msg: "Categoría eliminada correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la categoría", detalle: error.message });
        }
    }
}

export default categoriaController;