const Order = require('../models/order');
const Dish = require('../models/dish');

// Crear una nueva orden
exports.createOrder = async (req, res) => {
  try {
    // Convertir los nombres de los platillos a IDs
    const dishesWithIds = await Promise.all(req.body.dishes.map(async (dish) => {
      const foundDish = await Dish.findOne({ name: dish.name });
      if (!foundDish) {
        throw new Error(`Dish with name ${dish.name} not found`);
      }
      return { dishId: foundDish._id, quantity: dish.quantity };
    }));

    const order = new Order({
      tableId: req.body.tableId,
      dishes: dishesWithIds,
      status: req.body.status
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




// Obtener todas las órdenes

// Obtener todas las órdenes
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('dishes.dishId', 'name');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener una orden por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('dishes.dishId', 'name');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Crear, Actualizar y Eliminar orden se mantienen igual



// Crear, Actualizar y Eliminar orden se mantienen igual


// Actualizar una orden
// Actualizar una orden
exports.updateOrder = async (req, res) => {
    try {
      const { tableId, dishes, status } = req.body;
      const dishesWithIds = await Promise.all(dishes.map(async (dish) => {
        const foundDish = await Dish.findOne({ name: dish.name });
        if (!foundDish) {
          throw new Error(`Dish with name ${dish.name} not found`);
        }
        return { dishId: foundDish._id, quantity: dish.quantity };
      }));
  
      const updatedOrder = {
        tableId,
        dishes: dishesWithIds,
        status
      };
  
      const order = await Order.findByIdAndUpdate(req.params.id, updatedOrder, { new: true });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
// Eliminar una orden
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
