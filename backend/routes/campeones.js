const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload'); // Importar configuración de Multer
const campeonesController = require('../controllers/campeonesController');

// Aplicar Basic Auth a todas las rutas
router.use(auth);

// Rutas
router.get('/', campeonesController.getAll);
router.get('/:id', campeonesController.getById);
router.post('/', upload.single('imagen'), campeonesController.create); // Carga de imagen
router.put('/:id', upload.single('imagen'), campeonesController.update); // Carga de imagen
router.delete('/:id', campeonesController.remove);

module.exports = router;
