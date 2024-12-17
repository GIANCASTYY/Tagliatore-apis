const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }  // Opcional
});

module.exports = mongoose.model('Dish', dishSchema);
