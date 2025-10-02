// Database setup and initialization for Neon PostgreSQL
const { neon } = require('@neondatabase/serverless');

// Use environment variable or local connection string
const DATABASE_URL = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

if (!DATABASE_URL) {
  console.warn('DATABASE_URL not set. Using in-memory fallback for local development.');
}

const sql = DATABASE_URL ? neon(DATABASE_URL) : null;

// Initialize database tables
async function initDatabase() {
  if (!sql) {
    console.log('Skipping database initialization (no DATABASE_URL)');
    return;
  }

  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create flights table
    await sql`
      CREATE TABLE IF NOT EXISTS flights (
        id SERIAL PRIMARY KEY,
        from_city VARCHAR(255) NOT NULL,
        to_city VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        price INTEGER NOT NULL,
        seats JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create bookings table
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        flight_id INTEGER REFERENCES flights(id) ON DELETE CASCADE,
        passenger VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        seat INTEGER,
        status VARCHAR(50) DEFAULT 'Confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create payments table
    await sql`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
        transaction_id VARCHAR(255),
        amount INTEGER NOT NULL,
        status VARCHAR(50) DEFAULT 'completed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Seed demo data
async function seedDemoData() {
  if (!sql) return;

  try {
    // Check if users exist
    const users = await sql`SELECT COUNT(*) FROM users`;
    if (parseInt(users[0].count) === 0) {
      await sql`
        INSERT INTO users (name, email, password, role)
        VALUES 
          ('Demo User', 'demo@ars.com', 'demo123', 'user'),
          ('Admin', 'admin@ars.com', 'admin123', 'admin'),
          ('Demo User', 'user@ars.com', 'user123', 'user')
      `;
      console.log('Demo users seeded');
    }

    // Check if flights exist
    const flights = await sql`SELECT COUNT(*) FROM flights`;
    if (parseInt(flights[0].count) === 0) {
      const emptySeats = JSON.stringify(Array(30).fill(null));
      await sql`
        INSERT INTO flights (from_city, to_city, date, time, price, seats)
        VALUES 
          ('Mumbai', 'Delhi', '2025-10-10', '10:00', 5000, ${emptySeats}::jsonb),
          ('Delhi', 'Bangalore', '2025-10-11', '15:00', 6000, ${emptySeats}::jsonb),
          ('Goa', 'Chennai', '2025-10-12', '09:30', 4500, ${emptySeats}::jsonb),
          ('Kolkata', 'Hyderabad', '2025-10-13', '18:00', 7000, ${emptySeats}::jsonb),
          ('Pune', 'Ahmedabad', '2025-10-14', '13:45', 3800, ${emptySeats}::jsonb),
          ('Chennai', 'Bangalore', '2025-10-15', '07:20', 3200, ${emptySeats}::jsonb),
          ('Delhi', 'Goa', '2025-10-16', '16:10', 8000, ${emptySeats}::jsonb),
          ('Hyderabad', 'Mumbai', '2025-10-17', '11:00', 5400, ${emptySeats}::jsonb),
          ('Lucknow', 'Pune', '2025-10-18', '08:30', 4100, ${emptySeats}::jsonb),
          ('Bangalore', 'Kolkata', '2025-10-19', '19:00', 6700, ${emptySeats}::jsonb),
          ('Chandigarh', 'Delhi', '2025-10-20', '06:45', 2900, ${emptySeats}::jsonb),
          ('Indore', 'Jaipur', '2025-10-21', '17:20', 3500, ${emptySeats}::jsonb),
          ('Nagpur', 'Bhopal', '2025-10-22', '12:10', 2700, ${emptySeats}::jsonb),
          ('Surat', 'Chennai', '2025-10-23', '21:00', 6200, ${emptySeats}::jsonb),
          ('Patna', 'Ranchi', '2025-10-24', '14:30', 2500, ${emptySeats}::jsonb)
      `;
      console.log('Demo flights seeded');
    }
  } catch (error) {
    console.error('Error seeding demo data:', error);
  }
}

module.exports = { sql, initDatabase, seedDemoData };
