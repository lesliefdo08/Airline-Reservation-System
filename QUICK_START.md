# 🚀 Quick Start Guide

Get your Airline Reservation System running in 5 minutes!

## Step 1: Get Neon Database (2 minutes)

1. **Sign up for Neon** (free)
   - Go to: https://console.neon.tech/
   - Click "Sign up" (use GitHub or email)

2. **Create Project**
   - Click "Create Project"
   - Name: `Airline Reservation System`
   - Region: Choose closest to you
   - Click "Create"

3. **Copy Connection String**
   - In project dashboard, look for "Connection Details"
   - Copy the string that starts with `postgresql://`
   - It looks like:
     ```
     postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
     ```
   - Save this somewhere - you'll need it next!

## Step 2: Setup Backend (1 minute)

1. **Open Terminal** in VS Code

2. **Navigate to server folder:**
   ```powershell
   cd "c:\Users\Leslie Fernando\Projects\Airline Reservation System\server"
   ```

3. **Create .env file:**
   ```powershell
   Copy-Item .env.example .env
   notepad .env
   ```

4. **Paste your connection string:**
   - Replace the example with your actual Neon connection string
   - Save and close Notepad

5. **Start server:**
   ```powershell
   npm start
   ```

   You should see:
   ```
   Database tables initialized successfully
   Demo users seeded
   Demo flights seeded
   Database ready
   Server running on http://localhost:5000
   ```

## Step 3: Start Frontend (1 minute)

1. **Open NEW Terminal** (don't close the backend one!)

2. **Navigate to client folder:**
   ```powershell
   cd "c:\Users\Leslie Fernando\Projects\Airline Reservation System\client"
   ```

3. **Start frontend:**
   ```powershell
   npm run dev
   ```

   You should see:
   ```
   VITE ready in XXXms
   Local: http://localhost:5173
   ```

4. **Open browser:**
   - Press `Ctrl` and click the `http://localhost:5173` link
   - OR manually go to: http://localhost:5173

## Step 4: Test the App (1 minute)

1. **Login:**
   - Email: `demo@ars.com`
   - Password: `demo123`
   - Click "Login"

2. **Search Flights:**
   - From: `New York`
   - To: `Los Angeles`
   - Click "Search Flights"
   - You should see several flights!

3. **Book a Flight:**
   - Click "Book" on any flight
   - Click on any gray seat to select it
   - Click "Proceed to Payment"
   - Click "Pay Now"
   - See confirmation message

4. **View Bookings:**
   - Click "My Bookings" in navigation
   - See your booking
   - Try clicking "Cancel Booking"

## ✅ Success Checklist

- [ ] Backend running (shows "Database ready")
- [ ] Frontend running (shows VITE ready)
- [ ] Can see login page
- [ ] Can login with demo@ars.com
- [ ] Can see flights list
- [ ] Can book a flight
- [ ] Can see booking in "My Bookings"
- [ ] Can cancel booking

## 🐛 Common Issues

### Issue: "Database not configured"
**Solution:** 
- Check `.env` file in `server` folder
- Make sure `DATABASE_URL` is set correctly
- Restart backend: `Ctrl+C` then `npm start`

### Issue: "Cannot connect to database"
**Solution:**
- Your connection string must end with `?sslmode=require`
- Check Neon dashboard - project must be active
- Copy connection string again from Neon

### Issue: "No flights showing"
**Solution:**
- Check backend terminal - should see "Demo flights seeded"
- Test API directly: Open http://localhost:5000/api/flights in browser
- Should see JSON array of flights

### Issue: "Network Error" in frontend
**Solution:**
- Make sure backend is running (check terminal)
- Backend must be on port 5000
- Check browser console (F12) for errors

### Issue: Port already in use
**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with number from above)
taskkill /PID <PID> /F

# Restart backend
npm start
```

## 🎨 Try These Features

### As Regular User
- ✅ Register new account
- ✅ Login with existing account
- ✅ Search flights with filters
- ✅ Select specific seat
- ✅ Make multiple bookings
- ✅ View booking history
- ✅ Cancel bookings

### As Admin
1. Logout current user
2. Login with admin account:
   - Email: `admin@ars.com`
   - Password: `admin123`
3. Try these:
   - ✅ Add new flight
   - ✅ Delete flights
   - ✅ View all bookings (all users)

## 📱 Test on Mobile

1. Find your local IP:
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Update client to allow network access:
   - Open `client/vite.config.js`
   - Should already have:
     ```js
     server: {
       host: true
     }
     ```

3. On your phone:
   - Connect to same WiFi as computer
   - Open browser
   - Go to: `http://YOUR_IP:5173`
   - Example: `http://192.168.1.100:5173`

## 🚀 Next Steps

### Local Development
- ✅ App is running locally
- ✅ Database persists data (Neon cloud)
- ✅ Can develop and test features

### Deploy to Production
When ready to deploy:
1. Read `DEPLOYMENT.md` for complete guide
2. Deploy backend to Render (free tier)
3. Deploy frontend to Netlify (free tier)
4. Share with users!

## 🔑 Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| demo@ars.com | demo123 | User |
| admin@ars.com | admin123 | Admin |
| user@ars.com | user123 | User |

## 📚 More Documentation

- **MIGRATION_SUMMARY.md** - What changed (MongoDB → PostgreSQL)
- **DEPLOYMENT.md** - Deploy to production
- **server/README.md** - Backend API details
- **README.md** - Project overview

## 💡 Pro Tips

1. **Keep terminals open:** Don't close backend/frontend terminals while testing
2. **Use Ctrl+C:** Stop servers with `Ctrl+C` in terminal
3. **Check logs:** Always check terminal output for errors
4. **Clear cache:** If UI acts weird, try `Ctrl+Shift+R` to hard refresh
5. **Use F12:** Open browser DevTools to see API calls and errors

## 🎉 You're Ready!

Your Airline Reservation System is now:
- ✅ Running locally
- ✅ Connected to cloud database (Neon)
- ✅ Fully functional (book, cancel, payments)
- ✅ Ready for development
- ✅ Ready for deployment

**Happy coding!** 🛫

---

Need help? Check:
1. Terminal output (backend logs)
2. Browser console (F12 → Console tab)
3. Network tab (F12 → Network tab)
4. MIGRATION_SUMMARY.md for troubleshooting
