# Migration Complete: MongoDB → Neon PostgreSQL

## What Was Done

Your Airline Reservation System has been successfully migrated from MongoDB to Neon PostgreSQL, making it fully compatible with serverless deployments like Netlify + Render/Railway.

## Changes Made

### 1. Database Layer (`server/database.js`)
**NEW FILE** - Complete PostgreSQL setup:
- ✅ Neon connection using `@neondatabase/serverless`
- ✅ Automatic table creation (users, flights, bookings, payments)
- ✅ Seed data function (3 users, 15 flights)
- ✅ JSONB support for seat arrays
- ✅ Proper foreign key relationships

### 2. Backend API (`server/index.js`)
**MIGRATED** - All endpoints now use PostgreSQL:

#### Authentication Endpoints
- ✅ `POST /api/login` - SQL query with password check
- ✅ `POST /api/register` - Insert user with RETURNING

#### Flights Endpoints
- ✅ `GET /api/flights` - Query with filters (from, to, date)
- ✅ `POST /api/flights` - Insert with RETURNING
- ✅ `DELETE /api/flights/:id` - Cascade delete bookings
- ✅ `GET /api/flights/:id/seats` - Return JSONB seats array

#### Bookings Endpoints
- ✅ `POST /api/book` - Atomic seat update + booking insert
- ✅ `GET /api/bookings` - JOIN query with flight details
- ✅ `POST /api/bookings/:id/cancel` - Update status + free seat
- ✅ Data transformation (snake_case DB → camelCase frontend)

#### Payment Endpoint
- ✅ `POST /api/pay` - Persist to payments table
- ✅ Store transaction_id, amount, method, status

### 3. Frontend API (`client/src/api/ars.js`)
**UPDATED** - Environment variable support:
- ✅ Uses `VITE_API_URL` for production backend
- ✅ Falls back to `localhost:5000` for development
- ✅ No code changes needed in components

### 4. Removed Files
- ❌ `server/models.js` - MongoDB models (no longer needed)
- ❌ Mongoose dependency removed from package.json

### 5. New Documentation
- 📄 `server/README.md` - Backend setup guide
- 📄 `server/.env.example` - Environment template
- 📄 `client/.env.example` - Frontend environment template
- 📄 `DEPLOYMENT.md` - Complete deployment guide (Neon + Render + Netlify)
- 📄 Updated root `README.md` - PostgreSQL instructions

### 6. Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

#### Flights Table
```sql
CREATE TABLE flights (
  id SERIAL PRIMARY KEY,
  flight_number VARCHAR(10) UNIQUE NOT NULL,
  from_city VARCHAR(255) NOT NULL,
  to_city VARCHAR(255) NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  arrival_date DATE NOT NULL,
  arrival_time TIME NOT NULL,
  price INTEGER NOT NULL,
  seats JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

#### Bookings Table
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  flight_id INTEGER REFERENCES flights(id) ON DELETE CASCADE,
  passenger VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  seat INTEGER,
  status VARCHAR(50) DEFAULT 'Confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

#### Payments Table
```sql
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id),
  amount DECIMAL(10,2) NOT NULL,
  method VARCHAR(50) DEFAULT 'Credit Card',
  user_email VARCHAR(255) NOT NULL,
  transaction_id VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'Completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## How to Use

### Local Development

1. **Get Neon Connection String**
   ```
   1. Visit https://console.neon.tech/
   2. Create new project: "Airline Reservation System"
   3. Copy connection string from dashboard
   ```

2. **Configure Backend**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env and paste your DATABASE_URL
   npm install
   npm start
   ```

3. **Start Frontend**
   ```bash
   cd client
   npm run dev
   ```

4. **Test**
   - Open http://localhost:5173
   - Login: demo@ars.com / demo123
   - Search flights, make bookings

### Production Deployment

See `DEPLOYMENT.md` for complete guide. Quick steps:

1. **Deploy Database** (Done - using Neon)

2. **Deploy Backend** (Render recommended)
   - Connect GitHub repo
   - Set root directory: `server`
   - Add env var: `DATABASE_URL` = your Neon connection string
   - Deploy

3. **Deploy Frontend** (Netlify)
   - Connect GitHub repo
   - Set base directory: `client`
   - Add env var: `VITE_API_URL` = your backend URL + `/api`
   - Deploy

## Testing

### Backend Tests (Updated)
```bash
cd server
npm test
```
- ✅ Tests now wait for database initialization
- ✅ Uses correct demo passwords (demo123)

### Frontend Tests (No Changes Needed)
```bash
cd client
npx cypress open
```
- ✅ All existing tests still pass
- ✅ No changes needed (API endpoints unchanged)

## Data Persistence

### What Gets Saved:
- ✅ User accounts (registration persists)
- ✅ Flight bookings (with seat selection)
- ✅ Booking history (view all past bookings)
- ✅ Payment records (transaction IDs, amounts)
- ✅ Booking cancellations (status updates, seat freed)

### Demo Data (Auto-seeded on first run):
- 3 demo users (demo, admin, user)
- 15 flights across multiple routes:
  - New York ↔ Los Angeles
  - London ↔ Paris
  - Tokyo ↔ Sydney
  - Dubai ↔ Singapore
  - Mumbai ↔ Delhi

## Benefits of PostgreSQL Migration

### Before (MongoDB)
- ❌ Not serverless-friendly
- ❌ Requires persistent connection
- ❌ Can't deploy backend to Netlify Functions
- ❌ Complex free hosting options

### After (Neon PostgreSQL)
- ✅ Serverless-native (HTTP-based)
- ✅ Auto-scaling
- ✅ Auto-suspend when idle (free tier)
- ✅ Works with Netlify, Render, Railway, Vercel
- ✅ 3 GB free storage
- ✅ Built-in connection pooling
- ✅ Automatic backups

## Troubleshooting

### "Database not configured"
**Cause:** DATABASE_URL not set
**Fix:** Check `.env` file has correct Neon connection string

### "Cannot connect to database"
**Cause:** Missing SSL mode or wrong format
**Fix:** Ensure URL ends with `?sslmode=require`

### "No flights showing"
**Cause:** Seed data not inserted
**Fix:** 
1. Check server logs for "Demo flights seeded"
2. Verify Neon dashboard shows data in flights table
3. Restart backend: `npm start`

### "Seat selection not working"
**Cause:** JSONB column issue
**Fix:** 
1. Check flights table has `seats JSONB` column
2. Verify seed data: `SELECT seats FROM flights LIMIT 1`
3. Should return: `[null, null, null, ...]` (30 nulls)

### "Bookings not persisting"
**Cause:** Foreign key constraint or table missing
**Fix:**
1. Check bookings table exists
2. Verify flight_id exists in flights table
3. Check server logs for SQL errors

## Environment Variables Reference

### Backend (.env)
```env
# Required
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Optional (auto-assigned in production)
PORT=5000
```

### Frontend (.env)
```env
# For production deployment only
VITE_API_URL=https://your-backend-url.com/api

# Leave empty for local development (uses localhost:5000)
```

## API Response Format Changes

### Before (MongoDB)
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "from": "New York",
  "to": "Los Angeles"
}
```

### After (PostgreSQL)
```json
{
  "_id": 1,
  "from": "New York",
  "to": "Los Angeles"
}
```

**Note:** Frontend still uses `_id` for compatibility. Backend maps `id` → `_id` in responses.

## Database Operations

### View Data (Neon SQL Editor)
```sql
-- View all users
SELECT * FROM users;

-- View all flights
SELECT * FROM flights;

-- View bookings with flight details
SELECT b.*, f.flight_number, f.from_city, f.to_city
FROM bookings b
JOIN flights f ON b.flight_id = f.id;

-- View payments
SELECT * FROM payments ORDER BY created_at DESC;
```

### Manual Data Management
```sql
-- Add a flight manually
INSERT INTO flights (flight_number, from_city, to_city, departure_date, departure_time, arrival_date, arrival_time, price, seats)
VALUES ('AB123', 'New York', 'Los Angeles', '2025-06-01', '10:00', '2025-06-01', '13:00', 299, '[]'::jsonb);

-- Update user role
UPDATE users SET role = 'admin' WHERE email = 'user@example.com';

-- Cancel all bookings for a user
UPDATE bookings SET status = 'Cancelled' WHERE user_email = 'user@example.com';

-- Clear all demo data (caution!)
TRUNCATE users, flights, bookings, payments RESTART IDENTITY CASCADE;
```

## Next Steps

1. ✅ Test locally with your Neon database
2. ✅ Verify all features work (login, search, book, cancel)
3. ✅ Deploy backend to Render/Railway (see DEPLOYMENT.md)
4. ✅ Deploy frontend to Netlify with backend URL
5. ✅ Test production deployment end-to-end
6. ✅ Share with users!

## Support

- **Backend Setup:** See `server/README.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Neon Docs:** https://neon.tech/docs
- **Render Docs:** https://render.com/docs
- **Netlify Docs:** https://docs.netlify.com

---

**Migration completed successfully!** 🎉

Your application now uses PostgreSQL and is ready for production deployment on serverless platforms.
