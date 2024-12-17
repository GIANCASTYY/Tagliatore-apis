const Cliente = require('../models/client');


// Obtener todos los clientes
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Cliente.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo cliente
exports.createClient = async (req, res) => {
  const client = new Cliente({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dni: req.body.dni
  });

  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener un cliente por ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Cliente.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un cliente
exports.updateClient = async (req, res) => {
  try {
    const client = await Cliente.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    client.name = req.body.name || client.name;
    client.email = req.body.email || client.email;
    client.phone = req.body.phone || client.phone;
    client.dni = req.body.dni || client.dni;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un client

// Eliminar un cliente
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
