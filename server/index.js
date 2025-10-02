// Entry point for the Express backend
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sql, initDatabase, seedDemoData } = require('./database');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize database and seed data
(async () => {
  await initDatabase();
  await seedDemoData();
  console.log('Database ready');
})();

// Auth endpoints
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!sql) return res.json({ success: false, message: 'Database not configured' });
    
    const users = await sql`SELECT * FROM users WHERE email = ${email} AND password = ${password}`;
    if (users.length > 0) {
      const user = users[0];
      res.json({ success: true, user: { name: user.name, email: user.email, role: user.role } });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!sql) return res.json({ success: false, message: 'Database not configured' });
    
    const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return res.json({ success: false, message: 'Email already registered' });
    }
    
    await sql`INSERT INTO users (name, email, password, role) VALUES (${name}, ${email}, ${password}, 'user')`;
    res.json({ success: true });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Flights endpoints
app.get('/api/flights', async (req, res) => {
  try {
    if (!sql) return res.json([]);
    
    const { from, to } = req.query;
    let flights;
    
    if (from && to) {
      flights = await sql`SELECT * FROM flights WHERE from_city = ${from} AND to_city = ${to} ORDER BY date, time`;
    } else if (from) {
      flights = await sql`SELECT * FROM flights WHERE from_city = ${from} ORDER BY date, time`;
    } else if (to) {
      flights = await sql`SELECT * FROM flights WHERE to_city = ${to} ORDER BY date, time`;
    } else {
      flights = await sql`SELECT * FROM flights ORDER BY date, time`;
    }
    
    // Transform data to match frontend expectations
    const formattedFlights = flights.map(f => ({
      _id: f.id,
      from: f.from_city,
      to: f.to_city,
      date: f.date,
      time: f.time,
      price: f.price,
      seats: f.seats || Array(30).fill(null)
    }));
    
    res.json(formattedFlights);
  } catch (error) {
    console.error('Get flights error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/flights', async (req, res) => {
  try {
    if (!sql) return res.json({ success: false, message: 'Database not configured' });
    
    const { from, to, date, time, price } = req.body;
    const emptySeats = JSON.stringify(Array(30).fill(null));
    
    const result = await sql`
      INSERT INTO flights (from_city, to_city, date, time, price, seats)
      VALUES (${from}, ${to}, ${date}, ${time}, ${price}, ${emptySeats}::jsonb)
      RETURNING *
    `;
    
    const flight = result[0];
    res.json({ 
      success: true, 
      flight: {
        _id: flight.id,
        from: flight.from_city,
        to: flight.to_city,
        date: flight.date,
        time: flight.time,
        price: flight.price,
        seats: flight.seats
      }
    });
  } catch (error) {
    console.error('Create flight error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/flights/:id', async (req, res) => {
  try {
    if (!sql) return res.json({ success: false, message: 'Database not configured' });
    
    const id = parseInt(req.params.id);
    await sql`DELETE FROM bookings WHERE flight_id = ${id}`;
    await sql`DELETE FROM flights WHERE id = ${id}`;
    res.json({ success: true });
  } catch (error) {
    console.error('Delete flight error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Seat map for a flight
app.get('/api/flights/:id/seats', async (req, res) => {
  try {
    if (!sql) return res.json([]);
    
    const id = parseInt(req.params.id);
    const flights = await sql`SELECT seats FROM flights WHERE id = ${id}`;
    
    if (flights.length === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    
    res.json(flights[0].seats || Array(30).fill(null));
  } catch (error) {
    console.error('Get seats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Book a flight (with seat selection)
app.post('/api/book', async (req, res) => {
  try {
    if (!sql) return res.json({ success: false, message: 'Database not configured' });
    
    const { flightId, passenger, userEmail, seat } = req.body;
    const id = parseInt(flightId);
    
    // Get current flight
    const flights = await sql`SELECT * FROM flights WHERE id = ${id}`;
    if (flights.length === 0) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }
    
    const flight = flights[0];
    const seats = flight.seats || Array(30).fill(null);
    
    // Check if seat is already booked
    if (seat !== undefined && seats[seat]) {
      return res.json({ success: false, message: 'Seat already booked' });
    }
    
    // Update seat
    if (seat !== undefined) {
      seats[seat] = userEmail;
      await sql`UPDATE flights SET seats = ${JSON.stringify(seats)}::jsonb WHERE id = ${id}`;
    }
    
    // Create booking
    const result = await sql`
      INSERT INTO bookings (flight_id, passenger, user_email, seat, status)
      VALUES (${id}, ${passenger}, ${userEmail}, ${seat}, 'Confirmed')
      RETURNING *
    `;
    
    const booking = result[0];
    res.json({ 
      success: true, 
      bookingId: booking.id, 
      booking: {
        _id: booking.id,
        flight: booking.flight_id,
        passenger: booking.passenger,
        userEmail: booking.user_email,
        seat: booking.seat,
        status: booking.status
      }
    });
  } catch (error) {
    console.error('Book flight error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Cancel booking
app.post('/api/bookings/:id/cancel', async (req, res) => {
  try {
    if (!sql) return res.json({ success: false, message: 'Database not configured' });
    
    const id = parseInt(req.params.id);
    
    // Get booking details
    const bookings = await sql`SELECT * FROM bookings WHERE id = ${id}`;
    if (bookings.length === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    const booking = bookings[0];
    
    // Update booking status
    await sql`UPDATE bookings SET status = 'Cancelled' WHERE id = ${id}`;
    
    // Free up seat
    if (booking.seat !== undefined && booking.flight_id) {
      const flights = await sql`SELECT seats FROM flights WHERE id = ${booking.flight_id}`;
      if (flights.length > 0) {
        const seats = flights[0].seats || Array(30).fill(null);
        seats[booking.seat] = null;
        await sql`UPDATE flights SET seats = ${JSON.stringify(seats)}::jsonb WHERE id = ${booking.flight_id}`;
      }
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all bookings (optionally filter by user)
app.get('/api/bookings', async (req, res) => {
  try {
    if (!sql) return res.json([]);
    
    const { userEmail } = req.query;
    
    let bookings;
    if (userEmail) {
      bookings = await sql`
        SELECT 
          b.id,
          b.passenger,
          b.user_email,
          b.seat,
          b.status,
          b.created_at,
          f.id as flight_id,
          f.flight_number,
          f.from_city,
          f.to_city,
          f.departure_date,
          f.departure_time,
          f.arrival_date,
          f.arrival_time,
          f.price
        FROM bookings b
        JOIN flights f ON b.flight_id = f.id
        WHERE b.user_email = ${userEmail}
        ORDER BY b.created_at DESC
      `;
    } else {
      bookings = await sql`
        SELECT 
          b.id,
          b.passenger,
          b.user_email,
          b.seat,
          b.status,
          b.created_at,
          f.id as flight_id,
          f.flight_number,
          f.from_city,
          f.to_city,
          f.departure_date,
          f.departure_time,
          f.arrival_date,
          f.arrival_time,
          f.price
        FROM bookings b
        JOIN flights f ON b.flight_id = f.id
        ORDER BY b.created_at DESC
      `;
    }
    
    // Transform to match frontend expectations
    const result = bookings.map(b => ({
      _id: b.id,
      passenger: b.passenger,
      userEmail: b.user_email,
      seat: b.seat,
      status: b.status,
      createdAt: b.created_at,
      flight: {
        _id: b.flight_id,
        flightNumber: b.flight_number,
        from: b.from_city,
        to: b.to_city,
        departureDate: b.departure_date,
        departureTime: b.departure_time,
        arrivalDate: b.arrival_date,
        arrivalTime: b.arrival_time,
        price: b.price
      }
    }));
    
    res.json(result);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Payment simulation with persistence
app.post('/api/pay', async (req, res) => {
  try {
    if (!sql) {
      // Fallback if database not configured
      setTimeout(() => {
        res.json({ success: true, transactionId: Math.floor(Math.random() * 1000000) });
      }, 1200);
      return;
    }
    
    const { bookingId, amount, method, userEmail } = req.body;
    
    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        const transactionId = Math.floor(Math.random() * 1000000);
        
        // Store payment in database
        await sql`
          INSERT INTO payments (booking_id, amount, method, user_email, transaction_id, status)
          VALUES (${bookingId || null}, ${amount || 0}, ${method || 'Credit Card'}, ${userEmail}, ${transactionId.toString()}, 'Completed')
        `;
        
        res.json({ success: true, transactionId });
      } catch (error) {
        console.error('Payment storage error:', error);
        res.json({ success: true, transactionId: Math.floor(Math.random() * 1000000) });
      }
    }, 1200);
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ success: false, message: 'Payment failed' });
  }
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
