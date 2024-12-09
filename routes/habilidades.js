const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const habilidadesController = require('../controllers/habilidadesController');

// Aplicar Basic Auth a todas las rutas
router.use(auth);

// Rutas para las habilidades
router.get('/', habilidadesController.getAll);  // GET todas las habilidades
router.get('/:id', habilidadesController.getById);  // GET habilidad por ID
router.post('/', habilidadesController.create);  // POST para crear una habilidad
router.put('/:id', habilidadesController.update);  // PUT para actualizar habilidad
router.delete('/:id', habilidadesController.remove);  // DELETE para borrar habilidad


module.exports = router;
