const express = require('express');
const { registerWaiter, loginWaiter } = require('../controllers/authController');

const router = express.Router();

// Rutas
router.post('/register', registerWaiter);
router.post('/login', loginWaiter);

module.exports = router;
