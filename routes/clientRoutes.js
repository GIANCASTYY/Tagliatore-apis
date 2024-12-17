const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Crear un nuevo cliente
router.post('/', clientController.createClient);

// Obtener todos los clientes
router.get('/', clientController.getAllClients);

// Obtener un cliente por ID
router.get('/:id', clientController.getClientById);

// Actualizar un cliente por ID
router.put('/:id', clientController.updateClient);

// Ruta para eliminar un cliente
router.delete('/:id', clientController.deleteClient);


module.exports = router;
