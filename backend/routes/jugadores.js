const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/jugadoresController');  // Asegúrate de que esta ruta sea correcta

// Ruta para obtener todos los jugadores
router.get('/', jugadoresController.getAll);

// Otras rutas también deben ser configuradas aquí
router.get('/:id', jugadoresController.getById);
router.post('/', jugadoresController.create);
router.put('/:id', jugadoresController.update);
router.delete('/:id', jugadoresController.remove);

// Exporta el router
module.exports = router;
