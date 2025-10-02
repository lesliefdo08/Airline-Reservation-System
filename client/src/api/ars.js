// API utility for Airline Reservation System
// Use environment variable for production, fallback to localhost for development
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export async function login(data) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function register(data) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getFlights() {
  const res = await fetch(`${API_BASE}/flights`);
  return res.json();
}

export async function bookFlight(data) {
  const res = await fetch(`${API_BASE}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getBookings() {
  const res = await fetch(`${API_BASE}/bookings`);
  return res.json();
}

export async function getSeatMap(flightId) {
  const res = await fetch(`${API_BASE}/flights/${flightId}/seats`);
  return res.json();
}

export const bookFlightWithSeat = bookFlight;
