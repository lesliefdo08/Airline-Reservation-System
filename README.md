# Airline Reservation System

A modern, full-stack Airline Reservation System built with React, Tailwind CSS, Node.js, and MongoDB. Features include flight booking, seat selection, real-time flight status, admin dashboard, live chat support, and comprehensive documentation.

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
- Node.js (v16+ recommended)
- MongoDB (local or cloud)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd Airline\ Reservation\ System
   ```
2. **Install dependencies:**
   ```sh
   cd server
   npm install
   cd ../client
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the `server` folder with your MongoDB URI:
     ```env
     MONGO_URI=mongodb://localhost:27017/airline
     PORT=5000
     ```

### Running the App
1. **Start the backend:**
   ```sh
   cd server
   npm start
   ```
2. **Start the frontend:**
   ```sh
   cd client
   npm start
   ```
3. **Access the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Accounts
- **Admin:**
  - Email: admin@ars.com
  - Password: admin123
- **User:**
  - Email: user@ars.com
  - Password: user123

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
