# Deployment Guide - Airline Reservation System

This guide will help you deploy the full-stack Airline Reservation System to production.

## Architecture Overview

- **Frontend**: React SPA → Netlify
- **Backend**: Node.js/Express API → Render/Railway/Heroku
- **Database**: PostgreSQL → Neon (serverless)

## Step 1: Setup Neon Database

1. **Create Neon Account**
   - Go to https://console.neon.tech/
   - Sign up with GitHub or email

2. **Create New Project**
   - Click "New Project"
   - Name: "Airline Reservation System"
   - Region: Choose closest to your users
   - Postgres version: 16 (latest)

3. **Get Connection String**
   - In your project dashboard, click "Connection Details"
   - Copy the connection string (looks like):
     ```
     postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
     ```
   - Save this for backend deployment

## Step 2: Deploy Backend API

### Option A: Deploy to Render (Recommended)

1. **Create Render Account**
   - Go to https://render.com/
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   - **Name**: `ars-backend` (or your choice)
   - **Region**: Oregon (US West) or closest
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Add Environment Variable**
   - Click "Environment" tab
   - Add variable:
     - **Key**: `DATABASE_URL`
     - **Value**: Your Neon connection string (from Step 1.3)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy the service URL (e.g., `https://ars-backend.onrender.com`)

### Option B: Deploy to Railway

1. **Create Railway Account**
   - Go to https://railway.app/
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Configure Service**
   - Click "Settings"
   - **Root Directory**: `/server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variable**
   - Click "Variables" tab
   - Add variable:
     - **Variable**: `DATABASE_URL`
     - **Value**: Your Neon connection string

5. **Deploy**
   - Click "Deploy"
   - Copy the service URL from "Settings" → "Domains"

### Option C: Deploy to Heroku

1. **Create Heroku Account**
   - Go to https://heroku.com/
   - Sign up and install Heroku CLI

2. **Create New App**
   ```bash
   heroku login
   heroku create ars-backend
   ```

3. **Set Environment Variable**
   ```bash
   heroku config:set DATABASE_URL="your_neon_connection_string"
   ```

4. **Deploy Backend Only**
   ```bash
   cd "c:\Users\Leslie Fernando\Projects\Airline Reservation System"
   git subtree push --prefix server heroku main
   ```

5. **Open App**
   ```bash
   heroku open
   ```

## Step 3: Verify Backend Deployment

1. **Test Health Endpoint**
   - Open browser: `https://your-backend-url.com/api/flights`
   - Should see JSON array of flights

2. **Check Logs** (if issues)
   - **Render**: Dashboard → Logs tab
   - **Railway**: Dashboard → Deployments → View Logs
   - **Heroku**: `heroku logs --tail`

3. **Common Issues**
   - **"Database not configured"**: Check DATABASE_URL is set correctly
   - **"Cannot connect"**: Verify Neon connection string includes `?sslmode=require`
   - **"Port already in use"**: Clear (production assigns port automatically)

## Step 4: Configure Frontend for Production

1. **Create Environment File**
   ```bash
   cd "c:\Users\Leslie Fernando\Projects\Airline Reservation System\client"
   Copy-Item .env.example .env
   ```

2. **Edit `.env` File**
   - Open `client/.env`
   - Set your backend URL:
     ```
     VITE_API_URL=https://your-backend-url.com/api
     ```
   - Example:
     ```
     VITE_API_URL=https://ars-backend.onrender.com/api
     ```

3. **Test Locally with Production Backend**
   ```bash
   npm run dev
   ```
   - Open http://localhost:5173
   - Try logging in with: `demo@ars.com` / `demo123`
   - Search for flights
   - If it works, frontend is correctly configured

## Step 5: Deploy Frontend to Netlify

### Method 1: Netlify UI (Easiest)

1. **Login to Netlify**
   - Go to https://app.netlify.com/
   - Sign up with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your repository

3. **Configure Build Settings**
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

4. **Add Environment Variable**
   - Before deploying, click "Show advanced"
   - Add environment variable:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://your-backend-url.com/api`

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment (1-2 minutes)
   - Netlify will assign a URL like `https://random-name.netlify.app`

6. **Custom Domain (Optional)**
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Follow DNS configuration steps

### Method 2: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   cd "c:\Users\Leslie Fernando\Projects\Airline Reservation System\client"
   netlify deploy --prod
   ```

4. **Configure**
   - Choose "Create & configure a new site"
   - Set publish directory: `dist`
   - After deployment, set environment variable in Netlify UI

## Step 6: Verify Full Deployment

1. **Open Netlify URL**
   - Example: `https://your-app.netlify.app`

2. **Test Complete Flow**
   - Login with: `demo@ars.com` / `demo123`
   - Search flights: From "New York" to "Los Angeles"
   - Click "Book" on a flight
   - Select seat
   - Proceed to payment
   - Complete booking
   - View "My Bookings"
   - Cancel a booking

3. **Check Backend Logs**
   - Verify API calls are reaching backend
   - Check for any errors

## Environment Variables Summary

### Backend (Render/Railway/Heroku)
```
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
PORT=5000 (auto-assigned in production)
```

### Frontend (Netlify)
```
VITE_API_URL=https://your-backend-url.com/api
```

## Production URLs

After deployment, you'll have:

- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-backend.onrender.com` (or Railway/Heroku)
- **Database**: Managed by Neon (serverless, auto-scaling)

## Monitoring & Maintenance

### Backend Monitoring
- **Render**: Built-in metrics and logs
- **Railway**: Resource usage and deployment history
- **Heroku**: Heroku Dashboard with dynos and logs

### Database Monitoring
- **Neon Dashboard**: Query performance, storage, connections
- Free tier: 3 GB storage, 1 branch
- Auto-scaling and auto-suspend when idle

### Netlify Monitoring
- **Analytics**: Page views, performance
- **Build logs**: Check for deployment issues
- **Forms**: If you add contact forms

## Updating the Application

### Frontend Updates
1. Make changes locally
2. Commit and push to GitHub
3. Netlify auto-deploys (if enabled)
4. Or manually: `netlify deploy --prod`

### Backend Updates
1. Make changes locally
2. Commit and push to GitHub
3. Render/Railway auto-deploys
4. Check logs for successful deployment

### Database Updates
- Schema changes: Update `server/database.js`
- Seed data: Modify `seedDemoData()` function
- Migration: Consider using a migration tool for production

## Cost Breakdown

### Free Tier Limits
- **Neon**: 3 GB storage, 1 branch, auto-suspend after inactivity
- **Render**: 750 hours/month (1 instance), sleeps after 15 min inactivity
- **Railway**: $5 free credit/month, sleeps after inactivity
- **Netlify**: 100 GB bandwidth, 300 build minutes/month

### Keeping Services Awake
If you want 24/7 uptime without sleep:
- **Render**: Paid plan ($7/month)
- **Railway**: Add payment method (pay per usage)
- **Use UptimeRobot**: Free service to ping your backend every 5 min

## Troubleshooting

### Frontend can't reach backend
1. Check CORS: Backend allows all origins in `index.js`
2. Verify `VITE_API_URL` is correct
3. Check backend is running (visit `/api/flights`)
4. Check browser console for CORS errors

### Backend can't connect to database
1. Verify `DATABASE_URL` environment variable
2. Check Neon project is active (not suspended)
3. Ensure connection string includes `?sslmode=require`
4. Check Neon dashboard for connection limits

### Flights not showing
1. Check backend logs: Should see "Database ready"
2. Visit `/api/flights` directly
3. Check if seed data was inserted (Neon SQL editor)
4. Verify frontend API_BASE points to production backend

### Bookings not persisting
1. Check backend logs when making booking
2. Verify bookings table exists in Neon
3. Check frontend sends correct data format
4. Test with Postman/Thunder Client

### Payments not recording
1. Check payments table in Neon
2. Verify `/api/pay` endpoint receives data
3. Check bookingId is sent from frontend
4. Look for errors in backend logs

## Security Recommendations

1. **Environment Variables**
   - Never commit `.env` files
   - Use Netlify/Render environment variable UI
   - Rotate database passwords regularly

2. **API Security**
   - Add rate limiting (express-rate-limit)
   - Implement JWT authentication (replace demo auth)
   - Validate all input data
   - Use HTTPS only (enforced by Netlify/Render)

3. **Database Security**
   - Use Neon's connection pooling
   - Enable SQL query logging
   - Regular backups (Neon auto-backup)
   - Restrict database access to backend only

4. **CORS Configuration**
   - Update CORS in production:
   ```javascript
   app.use(cors({
     origin: 'https://your-app.netlify.app'
   }));
   ```

## Next Steps

1. ✅ Deploy database (Neon)
2. ✅ Deploy backend (Render/Railway/Heroku)
3. ✅ Deploy frontend (Netlify)
4. 🔄 Test complete user flow
5. 🔄 Set up custom domain
6. 🔄 Configure monitoring
7. 🔄 Add SSL certificate (auto with Netlify)
8. 🔄 Share with users!

## Support Resources

- **Neon Docs**: https://neon.tech/docs
- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Railway Docs**: https://docs.railway.app

For issues specific to this application, check the server logs and browser console first.

---

**Congratulations!** 🎉 Your Airline Reservation System is now live and production-ready!
