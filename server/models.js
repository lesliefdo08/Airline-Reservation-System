const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
});

const flightSchema = new mongoose.Schema({
  from: String,
  to: String,
  date: String,
  time: String,
  price: Number,
  seats: [String], // Array of userEmail or null
});

const bookingSchema = new mongoose.Schema({
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  status: String,
  passenger: String,
  userEmail: String,
  seat: Number,
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Flight: mongoose.model('Flight', flightSchema),
  Booking: mongoose.model('Booking', bookingSchema),
};
