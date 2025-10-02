// Entry point for the Express backend
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data storage for demo
let users = [
  { id: 1, name: 'Demo User', email: 'demo@ars.com', password: 'demo123', role: 'user' },
  { id: 2, name: 'Admin', email: 'admin@ars.com', password: 'admin123', role: 'admin' },
  { id: 3, name: 'User', email: 'user@ars.com', password: 'user123', role: 'user' }
];

let flights = [
  { _id: 1, from: 'Mumbai', to: 'Delhi', date: '2025-10-10', time: '10:00', price: 5000, seats: Array(30).fill(null) },
  { _id: 2, from: 'Delhi', to: 'Bangalore', date: '2025-10-11', time: '15:00', price: 6000, seats: Array(30).fill(null) },
  { _id: 3, from: 'Goa', to: 'Chennai', date: '2025-10-12', time: '09:30', price: 4500, seats: Array(30).fill(null) },
  { _id: 4, from: 'Kolkata', to: 'Hyderabad', date: '2025-10-13', time: '18:00', price: 7000, seats: Array(30).fill(null) },
  { _id: 5, from: 'Pune', to: 'Ahmedabad', date: '2025-10-14', time: '13:45', price: 3800, seats: Array(30).fill(null) },
  { _id: 6, from: 'Chennai', to: 'Bangalore', date: '2025-10-15', time: '07:20', price: 3200, seats: Array(30).fill(null) },
  { _id: 7, from: 'Delhi', to: 'Goa', date: '2025-10-16', time: '16:10', price: 8000, seats: Array(30).fill(null) },
  { _id: 8, from: 'Hyderabad', to: 'Mumbai', date: '2025-10-17', time: '11:00', price: 5400, seats: Array(30).fill(null) },
  { _id: 9, from: 'Lucknow', to: 'Pune', date: '2025-10-18', time: '08:30', price: 4100, seats: Array(30).fill(null) },
  { _id: 10, from: 'Bangalore', to: 'Kolkata', date: '2025-10-19', time: '19:00', price: 6700, seats: Array(30).fill(null) },
  { _id: 11, from: 'Chandigarh', to: 'Delhi', date: '2025-10-20', time: '06:45', price: 2900, seats: Array(30).fill(null) },
  { _id: 12, from: 'Indore', to: 'Jaipur', date: '2025-10-21', time: '17:20', price: 3500, seats: Array(30).fill(null) },
  { _id: 13, from: 'Nagpur', to: 'Bhopal', date: '2025-10-22', time: '12:10', price: 2700, seats: Array(30).fill(null) },
  { _id: 14, from: 'Surat', to: 'Chennai', date: '2025-10-23', time: '21:00', price: 6200, seats: Array(30).fill(null) },
  { _id: 15, from: 'Patna', to: 'Ranchi', date: '2025-10-24', time: '14:30', price: 2500, seats: Array(30).fill(null) }
];

let bookings = [];
let payments = [];
let bookingIdCounter = 1;
let flightIdCounter = 16;
let userIdCounter = 4;

console.log('Demo data loaded - Ready for demo!');

// Auth endpoints
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.json({ success: false, message: 'Email already registered' });
  }
  users.push({ id: userIdCounter++, name, email, password, role: 'user' });
  res.json({ success: true });
});

// Flights endpoints
app.get('/api/flights', (req, res) => {
  const { from, to } = req.query;
  let results = flights;
  
  if (from && to) {
    results = flights.filter(f => f.from === from && f.to === to);
  } else if (from) {
    results = flights.filter(f => f.from === from);
  } else if (to) {
    results = flights.filter(f => f.to === to);
  }
  
  res.json(results);
});

app.post('/api/flights', (req, res) => {
  const { from, to, date, time, price } = req.body;
  const newFlight = {
    _id: flightIdCounter++,
    from,
    to,
    date,
    time,
    price: parseInt(price),
    seats: Array(30).fill(null)
  };
  flights.push(newFlight);
  res.json({ success: true, flight: newFlight });
});

app.delete('/api/flights/:id', (req, res) => {
  const id = parseInt(req.params.id);
  flights = flights.filter(f => f._id !== id);
  bookings = bookings.filter(b => b.flight !== id);
  res.json({ success: true });
});

// Seat map for a flight
app.get('/api/flights/:id/seats', (req, res) => {
  const id = parseInt(req.params.id);
  const flight = flights.find(f => f._id === id);
  
  if (!flight) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  
  res.json(flight.seats || Array(30).fill(null));
});

// Book a flight (with seat selection)
app.post('/api/book', (req, res) => {
  const { flightId, passenger, userEmail, seat } = req.body;
  const id = parseInt(flightId);
  
  const flight = flights.find(f => f._id === id);
  if (!flight) {
    return res.status(404).json({ success: false, message: 'Flight not found' });
  }
  
  // Check if seat is already booked
  if (seat !== undefined && flight.seats[seat]) {
    return res.json({ success: false, message: 'Seat already booked' });
  }
  
  // Update seat
  if (seat !== undefined) {
    flight.seats[seat] = userEmail;
  }
  
  // Create booking
  const booking = {
    _id: bookingIdCounter++,
    flight: id,
    passenger,
    userEmail,
    seat,
    status: 'Confirmed',
    createdAt: new Date()
  };
  bookings.push(booking);
  
  res.json({ 
    success: true, 
    bookingId: booking._id, 
    booking
  });
});

// Cancel booking
app.post('/api/bookings/:id/cancel', (req, res) => {
  const id = parseInt(req.params.id);
  const booking = bookings.find(b => b._id === id);
  
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Booking not found' });
  }
  
  // Update booking status
  booking.status = 'Cancelled';
  
  // Free up seat
  if (booking.seat !== undefined && booking.flight) {
    const flight = flights.find(f => f._id === booking.flight);
    if (flight) {
      flight.seats[booking.seat] = null;
    }
  }
  
  res.json({ success: true });
});

// Get all bookings (optionally filter by user)
app.get('/api/bookings', (req, res) => {
  const { userEmail } = req.query;
  
  let results = bookings;
  if (userEmail) {
    results = bookings.filter(b => b.userEmail === userEmail);
  }
  
  // Add flight details to each booking
  const result = results.map(b => {
    const flight = flights.find(f => f._id === b.flight);
    return {
      _id: b._id,
      passenger: b.passenger,
      userEmail: b.userEmail,
      seat: b.seat,
      status: b.status,
      createdAt: b.createdAt,
      flight: flight ? {
        _id: flight._id,
        from: flight.from,
        to: flight.to,
        date: flight.date,
        time: flight.time,
        price: flight.price
      } : null
    };
  });
  
  res.json(result);
});

// Payment simulation
app.post('/api/pay', (req, res) => {
  const { bookingId, amount, method, userEmail } = req.body;
  
  // Simulate payment processing delay
  setTimeout(() => {
    const transactionId = Math.floor(Math.random() * 1000000);
    
    payments.push({
      bookingId: bookingId || null,
      amount: amount || 0,
      method: method || 'Credit Card',
      userEmail,
      transactionId: transactionId.toString(),
      status: 'Completed',
      createdAt: new Date()
    });
    
    res.json({ success: true, transactionId });
  }, 1200);
});

// Notification simulation
app.post('/api/notify', (req, res) => {
  // Simulate sending email/SMS
  res.json({ success: true });
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
