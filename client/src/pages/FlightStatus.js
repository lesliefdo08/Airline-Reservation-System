

import React, { useState, useEffect } from "react";
import SkyBackground from "../components/SkyBackground";
import axios from "axios";

const getId = obj => obj?._id || obj?.id || obj;


export default function FlightStatus() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    // Fetch unique airport/city list from backend
    axios.get("/api/flights").then(res => {
      const allFlights = res.data || [];
      const uniqueFrom = [...new Set(allFlights.map(f => f.from))];
      const uniqueTo = [...new Set(allFlights.map(f => f.to))];
      setAirports({ from: uniqueFrom, to: uniqueTo });
    });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
  setResults([]);
    setLoading(true);
    if (!from || !to) {
      setError("Please select both source and destination.");
      setLoading(false);
      return;
    }
    try {
      let res = await axios.get(`/api/flights?from=${from}&to=${to}`);
      if (res.data && res.data.length > 0) {
        // Simulate status for demo: randomize between On Time, Delayed, Cancelled
        const statusOptions = ["On Time", "Delayed", "Cancelled"];
        const flightsWithStatus = res.data.map(f => ({
          ...f,
          status: statusOptions[Math.floor(Math.random() * statusOptions.length)]
        }));
        setResults(flightsWithStatus);
      } else {
        setError("No flights found for this route.");
      }
    } catch {
      setError("Error fetching flight status. Try again later.");
    }
    setLoading(false);
  };

  return (
    <SkyBackground>
      <div className="container mx-auto py-8 min-h-[60vh] flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-6 text-white drop-shadow">Check Flight Status</h2>
        <form onSubmit={handleSearch} className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col gap-4 mb-8 animate-fade-in">
          <label className="font-semibold text-blue-900">Source</label>
          <select
            className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={from}
            onChange={e => setFrom(e.target.value)}
            required
          >
            <option value="">Select Source</option>
            {airports.from && airports.from.map((src, i) => (
              <option key={i} value={src}>{src}</option>
            ))}
          </select>
          <label className="font-semibold text-blue-900">Destination</label>
          <select
            className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={to}
            onChange={e => setTo(e.target.value)}
            required
          >
            <option value="">Select Destination</option>
            {airports.to && airports.to.map((dst, i) => (
              <option key={i} value={dst}>{dst}</option>
            ))}
          </select>
          <button className="bg-blue-700 text-white px-6 py-2 rounded font-bold hover:bg-blue-900 transition mt-2" type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && <div className="text-red-600 mb-4 animate-shake text-center">{error}</div>}
        {results.length > 0 && (
          <div className="w-full max-w-2xl grid gap-6 animate-fade-in">
            {results.map(flight => (
              <div key={getId(flight)} className="bg-white/90 rounded-2xl shadow-xl p-6 border-t-4 border-blue-700 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-bold text-lg text-blue-900 mb-1">Flight Status</div>
                  <div><b>From:</b> {flight.from}</div>
                  <div><b>To:</b> {flight.to}</div>
                  <div><b>Date:</b> {flight.date}</div>
                  <div><b>Time:</b> {flight.time}</div>
                  <div><b>Price:</b> {flight.price}</div>
                  <div><b>Seats Available:</b> {flight.seats.filter(s => !s).length} / {flight.seats.length}</div>
                </div>
                <div className={`mt-4 md:mt-0 md:ml-8 font-bold px-4 py-2 rounded-lg text-center ${
                  flight.status === "On Time" ? "bg-green-100 text-green-700" :
                  flight.status === "Delayed" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"}`}>{flight.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SkyBackground>
  );
}