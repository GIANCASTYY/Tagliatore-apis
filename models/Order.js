const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  tableId: { type: String, required: true },
  dishes: [dishSchema],
  status: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
