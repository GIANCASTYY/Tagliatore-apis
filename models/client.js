const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dni: { type: String, required: true }
}, { timestamps: true });

clientSchema.virtual('id').get(function() {
  return this._id.toHexString(); // Asigna el id como el valor del _id
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
