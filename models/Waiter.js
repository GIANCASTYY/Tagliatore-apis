const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const waiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'waiter'], default: 'waiter' },
}, { timestamps: true });

// Encriptar la contraseña antes de guardarla
waiterSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
waiterSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const Waiter = mongoose.model('Waiter', waiterSchema);

module.exports = Waiter;
