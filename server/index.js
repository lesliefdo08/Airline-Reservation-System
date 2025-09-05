// Entry point for the Express backend
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { User, Flight, Booking } = require('./models');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ars', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Seed demo data if empty
async function seedDemoData() {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.create([
      { name: 'Demo User', email: 'demo@ars.com', password: 'demo', role: 'user' },
      { name: 'Admin', email: 'admin@ars.com', password: 'admin', role: 'admin' },
    ]);
  }
  const flightCount = await Flight.countDocuments();
  if (flightCount === 0) {
    await Flight.create([
      { from: 'Mumbai', to: 'Delhi', date: '2025-09-10', time: '10:00', price: 5000, seats: Array(30).fill(null) },
      { from: 'Delhi', to: 'Bangalore', date: '2025-09-11', time: '15:00', price: 6000, seats: Array(30).fill(null) },
      { from: 'Goa', to: 'Chennai', date: '2025-09-12', time: '09:30', price: 4500, seats: Array(30).fill(null) },
      { from: 'Kolkata', to: 'Hyderabad', date: '2025-09-13', time: '18:00', price: 7000, seats: Array(30).fill(null) },
      { from: 'Pune', to: 'Ahmedabad', date: '2025-09-14', time: '13:45', price: 3800, seats: Array(30).fill(null) },
      { from: 'Chennai', to: 'Bangalore', date: '2025-09-15', time: '07:20', price: 3200, seats: Array(30).fill(null) },
      { from: 'Delhi', to: 'Goa', date: '2025-09-16', time: '16:10', price: 8000, seats: Array(30).fill(null) },
      { from: 'Hyderabad', to: 'Mumbai', date: '2025-09-17', time: '11:00', price: 5400, seats: Array(30).fill(null) },
      { from: 'Lucknow', to: 'Pune', date: '2025-09-18', time: '08:30', price: 4100, seats: Array(30).fill(null) },
      { from: 'Bangalore', to: 'Kolkata', date: '2025-09-19', time: '19:00', price: 6700, seats: Array(30).fill(null) },
      { from: 'Chandigarh', to: 'Delhi', date: '2025-09-20', time: '06:45', price: 2900, seats: Array(30).fill(null) },
      { from: 'Indore', to: 'Jaipur', date: '2025-09-21', time: '17:20', price: 3500, seats: Array(30).fill(null) },
      { from: 'Nagpur', to: 'Bhopal', date: '2025-09-22', time: '12:10', price: 2700, seats: Array(30).fill(null) },
      { from: 'Surat', to: 'Chennai', date: '2025-09-23', time: '21:00', price: 6200, seats: Array(30).fill(null) },
      { from: 'Patna', to: 'Ranchi', date: '2025-09-24', time: '14:30', price: 2500, seats: Array(30).fill(null) },
    ]);
  }
}
seedDemoData();

// Auth endpoints
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    res.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.findOne({ email })) {
    return res.json({ success: false, message: 'Email already registered' });
  }
  await User.create({ name, email, password, role: 'user' });
  res.json({ success: true });
});

// Flights endpoints
// Enhanced: filter by from/to and return seats for status
app.get('/api/flights', async (req, res) => {
  const { from, to } = req.query;
  let query = {};
  if (from) query.from = from;
  if (to) query.to = to;
  // For status page, return seats too
  const flights = await Flight.find(query);
  res.json(flights);
});

app.post('/api/flights', async (req, res) => {
  // Admin only (no auth check for demo)
  const { from, to, date, time, price } = req.body;
  const newFlight = await Flight.create({ from, to, date, time, price, seats: Array(30).fill(null) });
  res.json({ success: true, flight: newFlight });
});

app.delete('/api/flights/:id', async (req, res) => {
  const id = req.params.id;
  await Flight.findByIdAndDelete(id);
  await Booking.deleteMany({ flight: id });
  res.json({ success: true });
});

// Seat map for a flight
app.get('/api/flights/:id/seats', async (req, res) => {
  const id = req.params.id;
  const flight = await Flight.findById(id);
  if (!flight) return res.status(404).json({ error: 'Flight not found' });
  res.json(flight.seats);
});

// Book a flight (with seat selection)
app.post('/api/book', async (req, res) => {
  const { flightId, passenger, userEmail, seat } = req.body;
  const flight = await Flight.findById(flightId);
  if (!flight) return res.status(404).json({ success: false, message: 'Flight not found' });
  if (seat !== undefined && flight.seats[seat]) {
    return res.json({ success: false, message: 'Seat already booked' });
  }
  if (seat !== undefined) flight.seats[seat] = userEmail;
  await flight.save();
  const booking = await Booking.create({ flight: flightId, status: 'Confirmed', passenger, userEmail, seat });
  res.json({ success: true, bookingId: booking._id, booking });
});

// Cancel booking
app.post('/api/bookings/:id/cancel', async (req, res) => {
  const id = req.params.id;
  const booking = await Booking.findById(id);
  if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
  booking.status = 'Cancelled';
  await booking.save();
  // Free up seat
  if (booking.seat !== undefined && booking.flight) {
    const flight = await Flight.findById(booking.flight);
    if (flight) {
      flight.seats[booking.seat] = null;
      await flight.save();
    }
  }
  res.json({ success: true });
});

// Get all bookings (optionally filter by user)
app.get('/api/bookings', async (req, res) => {
  const { userEmail } = req.query;
  let bookings;
  if (userEmail) {
    bookings = await Booking.find({ userEmail });
  } else {
    bookings = await Booking.find();
  }
  res.json(bookings);
});

// Payment simulation
app.post('/api/pay', (req, res) => {
  // Simulate payment success
  setTimeout(() => {
    res.json({ success: true, transactionId: Math.floor(Math.random() * 1000000) });
  }, 1200);
});

// Notification simulation
app.post('/api/notify', (req, res) => {
  // Simulate sending email/SMS
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
