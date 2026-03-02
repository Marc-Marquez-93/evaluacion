import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // La carpeta base para todo
  },
  filename: function (req, file, cb) {
    // file.fieldname tomará el nombre del campo (ej: 'imagenIcon' o 'imagenUrl')
    const nombreUnico = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, nombreUnico);
  }
});

// Exportamos el middleware ya configurado
export const upload = multer({ storage: storage });