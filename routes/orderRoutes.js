const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Crear una nueva orden
router.post('/', orderController.createOrder);

// Obtener todas las órdenes
router.get('/', orderController.getAllOrders);

// Obtener una orden por ID
router.get('/:id', orderController.getOrderById);

// Actualizar una orden por ID
router.put('/:id', orderController.updateOrder);

// Eliminar una orden por ID
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
