// API utility for seat selection and seat map
const API_BASE = "http://localhost:5000/api";

export async function getSeatMap(flightId) {
  const res = await fetch(`${API_BASE}/flights/${flightId}/seats`);
  return res.json();
}

export async function bookFlightWithSeat(data) {
  // data: { flightId, passenger, userEmail, seat }
  const res = await fetch(`${API_BASE}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
