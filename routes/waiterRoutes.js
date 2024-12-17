const express = require('express');
const router = express.Router();
const waiterController = require('../controllers/waiterController');

// Crear un nuevo mesero
router.post('/', waiterController.createWaiter);

// Obtener todos los meseros
router.get('/', waiterController.getAllWaiters);

// Actualizar un mesero
router.put('/:id', waiterController.updateWaiter);

// Eliminar un mesero
router.delete('/:id', waiterController.deleteWaiter);

module.exports = router;
