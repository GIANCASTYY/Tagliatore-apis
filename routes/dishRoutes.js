const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');  // Asegúrate de que la ruta es correcta

// Crear un nuevo platillo
router.post('/', dishController.createDish);

// Obtener todos los platillos
router.get('/', dishController.getAllDishes);

// Obtener un platillo por ID
router.get('/:id', dishController.getDishById);

// Actualizar un platillo por ID
router.put('/:id', dishController.updateDish);

// Eliminar un platillo por ID
router.delete('/:id', dishController.deleteDish);

module.exports = router;
