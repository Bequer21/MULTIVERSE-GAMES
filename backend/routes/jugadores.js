const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const jugadoresController = require('../controllers/jugadoresController');

// Aplicar Basic Auth a todas las rutas
router.use(auth);

router.get('/', jugadoresController.getAll);
router.get('/:id', jugadoresController.getById);
router.post('/', jugadoresController.create);
router.put('/:id', jugadoresController.update);
router.delete('/:id', jugadoresController.remove);

module.exports = router;
