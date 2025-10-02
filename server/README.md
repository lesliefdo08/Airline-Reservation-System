# Airline Reservation System - Backend Setup

## Database Setup (Neon PostgreSQL)

1. **Create a Neon Account**: Go to [Neon Console](https://console.neon.tech/)
2. **Create a New Project**: Create a new project for your Airline Reservation System
3. **Get Connection String**: Copy the connection string (starts with `postgresql://`)

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   - Copy `.env.example` to `.env`
   - Replace `DATABASE_URL` with your Neon connection string
   ```
   DATABASE_URL=postgresql://username:password@host/database?sslmode=require
   ```

3. **Start Server**:
   ```bash
   npm start
   ```
   
   The server will:
   - Connect to Neon database
   - Create tables (users, flights, bookings, payments) if they don't exist
   - Seed demo data (3 users, 15 flights)
   - Run on `http://localhost:5000`

## Demo Accounts

- **Admin**: admin@ars.com / admin123
- **Demo User**: demo@ars.com / demo123
- **Regular User**: user@ars.com / user123

## Deployment Options

### Option 1: Render

1. Create account at [Render](https://render.com/)
2. Create new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment Variable**: `DATABASE_URL` = Your Neon connection string
5. Deploy

### Option 2: Railway

1. Create account at [Railway](https://railway.app/)
2. Create new project from GitHub
3. Configure:
   - **Root Directory**: `server`
   - **Environment Variable**: `DATABASE_URL` = Your Neon connection string
4. Deploy

### Option 3: Heroku

1. Create account at [Heroku](https://heroku.com/)
2. Create new app
3. Configure:
   ```bash
   heroku config:set DATABASE_URL=your_neon_connection_string
   git subtree push --prefix server heroku main
   ```

## Environment Variables

### Local (.env file)
```
DATABASE_URL=postgresql://...
PORT=5000
```

### Production (on hosting platform)
```
DATABASE_URL=postgresql://...
PORT=5000 (or auto-assigned)
```

### Netlify Functions (if using)
```
NETLIFY_DATABASE_URL=postgresql://...
```

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

### Flights
- `GET /api/flights` - Get all flights (with filters: from, to, date)
- `POST /api/flights` - Add new flight (admin only)
- `DELETE /api/flights/:id` - Delete flight (admin only)
- `GET /api/flights/:id/seats` - Get seat map

### Bookings
- `POST /api/book` - Book a flight with seat selection
- `GET /api/bookings` - Get bookings (filter by userEmail)
- `POST /api/bookings/:id/cancel` - Cancel booking

### Payments
- `POST /api/pay` - Process payment (persisted to database)

### Notifications
- `POST /api/notify` - Send notification (simulated)

## Database Schema

### Users Table
- id, email, password, name, role, created_at

### Flights Table
- id, flight_number, from_city, to_city, departure_date, departure_time, arrival_date, arrival_time, price, seats (JSONB)

### Bookings Table
- id, flight_id, passenger, user_email, seat, status, created_at

### Payments Table
- id, booking_id, amount, method, user_email, transaction_id, status, created_at

## Testing

Run backend tests:
```bash
npm test
```

Tests include:
- Login authentication
- User registration

## Frontend Integration

After deploying the backend, update the frontend API configuration:

1. Open `client/src/api/ars.js`
2. Update `API_BASE`:
   ```javascript
   const API_BASE = 'https://your-backend-url.com';
   ```
3. Deploy frontend to Netlify

## Troubleshooting

### "Database not configured" error
- Check that `DATABASE_URL` environment variable is set
- Verify Neon connection string is correct
- Check Neon project is active

### No flights showing
- Database has been seeded with 15 demo flights
- Check server logs for connection errors
- Verify API_BASE in frontend points to correct backend URL

### CORS errors
- Backend allows all origins in development
- For production, update CORS configuration in `index.js`

### Seats not updating
- Seats are stored as JSONB array in PostgreSQL
- Each flight has 30 seats (indices 0-29)
- null = available, email = booked

## Support

For issues, check:
1. Server logs
2. Browser console (Network tab)
3. Neon dashboard (query logs)
