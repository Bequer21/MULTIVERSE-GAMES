const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const partidasController = require('../controllers/partidasController');

// Aplicar Basic Auth a todas las rutas
router.use(auth);

router.get('/', partidasController.getAll);
router.get('/:id', partidasController.getById);
router.post('/', partidasController.create);
router.put('/:id', partidasController.update);
router.delete('/:id', partidasController.remove);

module.exports = router;
