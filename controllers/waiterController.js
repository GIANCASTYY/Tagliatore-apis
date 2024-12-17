const Waiter = require('../models/Waiter');

// Crear un mesero
exports.createWaiter = async (req, res) => {
  try {
    const waiter = new Waiter(req.body);
    await waiter.save();
    res.status(201).json(waiter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener todos los meseros
exports.getAllWaiters = async (req, res) => {
  try {
    const waiters = await Waiter.find();
    res.status(200).json(waiters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un mesero
exports.updateWaiter = async (req, res) => {
  try {
    const waiter = await Waiter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!waiter) {
      return res.status(404).json({ message: 'Waiter not found' });
    }
    res.status(200).json(waiter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un mesero
exports.deleteWaiter = async (req, res) => {
  try {
    const waiter = await Waiter.findByIdAndDelete(req.params.id);
    if (!waiter) {
      return res.status(404).json({ message: 'Waiter not found' });
    }
    res.status(200).json({ message: 'Waiter deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
