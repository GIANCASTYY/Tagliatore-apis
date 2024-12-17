const jwt = require('jsonwebtoken');
const Waiter = require('../models/Waiter');

// Registrar mesero
exports.registerWaiter = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verificar si el correo ya está registrado
        const existingWaiter = await Waiter.findOne({ email });
        if (existingWaiter) return res.status(400).json({ message: 'El correo ya está registrado' });

        // Crear y guardar mesero
        const waiter = new Waiter({ name, email, password });
        await waiter.save();

        res.status(201).json({ message: 'Mesero registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el mesero', error: error.message });
    }
};

// Iniciar sesión
exports.loginWaiter = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el mesero existe
        const waiter = await Waiter.findOne({ email });
        if (!waiter) return res.status(404).json({ message: 'Mesero no encontrado' });

        // Comparar contraseñas
        const isMatch = await waiter.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Generar token JWT
        const token = jwt.sign({ id: waiter._id, email: waiter.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
};
