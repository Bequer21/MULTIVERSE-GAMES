const express = require('express');
const router = express.Router();
const equiposController = require('../controllers/equiposController');
const auth = require('../middlewares/auth');

// Definimos las rutas
router.get('/', equiposController.getAll); // Obtener todos los equipos
router.get('/:id', equiposController.getById); // Obtener un equipo por ID
router.post('/', auth, equiposController.create); // Crear un nuevo equipo (protegido por auth)
router.put('/:id', auth, equiposController.update); // Actualizar un equipo (protegido por auth)
router.delete('/:id', auth, equiposController.remove); // Eliminar un equipo (protegido por auth)

module.exports = router;
