const multer = require('multer');
const path = require('path');

// Configuración de Multer para almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/campeones'); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        // Se guarda el archivo con su nombre original
        cb(null, file.originalname); // El nombre original del archivo será modificado después
    }
});

// Validación de tipo de archivo
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Tipo de archivo no permitido'), false);
    }
    cb(null, true);
};

// Crear el middleware de Multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // Límite de 2MB por archivo
});

module.exports = upload;
