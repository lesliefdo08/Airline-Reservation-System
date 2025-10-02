# ✈️ Airline Reservation System

A modern, full-stack Airline Reservation System built with React, Tailwind CSS, Node.js, and PostgreSQL (Neon). Features include flight booking, seat selection, booking management, admin dashboard, and production-ready deployment.

## Features
- User registration and login (single page)
- Search and book flights with seat selection
- Secure payment simulation
- View and manage bookings (change/cancel)
- Real-time flight status
- Admin dashboard for managing flights and bookings
- Live chat support with FAQ and AI-ready integration
- Mobile responsive, modern UI with blue/teal branding
- Documentation: FAQ, Help, Admin Guide

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Neon PostgreSQL account (free tier: https://neon.tech)
- npm or yarn

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd Airline\ Reservation\ System
   ```
2. **Setup Neon Database:**
   - Create account at https://console.neon.tech/
   - Create new project: "Airline Reservation System"
   - Copy your connection string (starts with `postgresql://`)

3. **Install backend dependencies:**
   ```sh
   cd server
   npm install
   ```

4. **Configure backend environment:**
   - Create `.env` file in `server` folder:
     ```env
     DATABASE_URL=postgresql://username:password@host/database?sslmode=require
     PORT=5000
     ```

5. **Install frontend dependencies:**
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
   - Connect to Neon database
   - Create tables (users, flights, bookings, payments)
   - Seed demo data (3 users, 15 flights)
   - Run on http://localhost:5000

2. **Start the frontend:**
   ```sh
   cd ../client
   npm run dev
   ```
   Frontend will run on http://localhost:5173

3. **Test the application:**
   - Login with demo account
   - Search and book flights
   - View bookings
   - Cancel bookings

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
  client/    # React frontend
  server/    # Node.js/Express backend
  SRS Airline Reservation System.pdf
  .gitignore
  README.md
```

## Documentation
- FAQ, Help, and Admin Guide are available in the app.
- Live chat widget for instant support.

## Contributing
Pull requests are welcome! For major changes, please open an issue first.

## License
This project is for educational/demo purposes.

---
Made by Leslie Fernando, Glenn Fernando, and Kenneth Fernandes.
