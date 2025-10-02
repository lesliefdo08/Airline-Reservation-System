# ✈️ Airline Reservation System

A modern, full-stack Airline Reservation System built with React, Tailwind CSS, and Node.js. Perfect for demos with in-memory data storage - no database setup required!

## Features
- User registration and login (single page)
- Search and book flights with seat selection
- Secure payment simulation
- View and manage bookings (change/cancel)
- Real-time flight status
- Admin dashboard for managing flights and bookings
- Live chat support with FAQ and AI-ready integration
- Mobile responsive, modern UI with blue branding
- **Zero configuration** - works out of the box!

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- **That's it! No database needed!**

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/lesliefdo08/Airline-Reservation-System.git
   cd Airline-Reservation-System
   ```

2. **Install backend dependencies:**
   ```sh
   cd server
   npm install
   ```

3. **Install frontend dependencies:**
   ```sh
   cd ../client
   npm install
   ```

### Running the App
1. **Start the backend:**
   ```sh
   cd server
   npm start
   ```
   Backend will:
   - Load demo data into memory (3 users, 15 flights)
   - Run on http://localhost:5000
   - Ready instantly - no database needed!

2. **Start the frontend:**
   ```sh
   cd ../client
   npm start
   ```
   Frontend will run on http://localhost:3000

3. **Test the application:**
   - Login with demo account
   - Search and book flights
   - View bookings
   - Cancel bookings
   - All data persists during the session!

### Demo Accounts
All demo accounts use simple passwords for testing:

| Email | Password | Role |
|-------|----------|------|
| demo@ars.com | demo123 | User |
| admin@ars.com | admin123 | Admin |
| user@ars.com | user123 | User |

⚠️ **Change these in production!**

## Project Structure
```
Airline Reservation System/
  client/    # React frontend (port 3000)
  server/    # Node.js/Express backend (port 5000)
           # Uses in-memory storage - perfect for demos!
  SRS Airline Reservation System.pdf
  .gitignore
  README.md
```

## Why In-Memory Storage?
- ✅ **Zero Configuration:** Works immediately, no database setup
- ✅ **Perfect for Demos:** Show all features without complexity
- ✅ **Fast Development:** Instant startup, no external dependencies
- ✅ **Easy Testing:** Clean state on every restart
- ✅ **Portable:** Run anywhere Node.js works

**Note:** Data resets when server restarts. Perfect for demonstrations!

## Documentation
- FAQ, Help, and Admin Guide are available in the app.
- Live chat widget for instant support.

## Contributing
Pull requests are welcome! For major changes, please open an issue first.

## License
This project is for educational/demo purposes.

---
Made by Leslie Fernando, Glenn Fernando, and Kenneth Fernandes.
