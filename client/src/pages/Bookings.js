

import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import { getSeatMap } from "../api/seats";
import SkyBackground from "../components/SkyBackground";

const getId = obj => obj?._id || obj?.id || obj;

export default function Bookings() {
  const { bookings, cancelBooking, flights } = useBooking();
  const { user } = useAuth();
  const [seatMaps, setSeatMaps] = useState({});

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchSeats() {
      setLoading(true);
      const maps = {};
      for (const booking of bookings) {
        const flightId = getId(booking.flight);
        if (!maps[flightId]) {
          try { maps[flightId] = await getSeatMap(flightId); } catch {}
        }
      }
      setSeatMaps(maps);
      setLoading(false);
    }
    if (user && bookings.length > 0) fetchSeats();
  }, [user, bookings]);

  if (!user) return (
    <SkyBackground>
      <div className="text-center py-16 text-xl text-gray-100">Please log in to view your bookings.</div>
    </SkyBackground>
  );
  const userBookings = bookings.filter(b => b.userEmail === user.email);

  return (
    <SkyBackground>
      <div className="container mx-auto py-8 min-h-[80vh]">
        <h2 className="text-4xl font-extrabold mb-8 text-white drop-shadow">My Bookings</h2>
        {loading ? (
          <Spinner className="mt-12" />
        ) : userBookings.length === 0 ? (
          <div className="text-center text-gray-100">No bookings found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userBookings.map(booking => {
              const flight = flights.find(f => getId(f) === getId(booking.flight));
              const seatMap = seatMaps[getId(booking.flight)];
              return (
                <div key={getId(booking)} className="bg-white/90 rounded-2xl shadow-xl p-6 border-t-4 border-blue-700 hover:scale-105 transition-all backdrop-blur-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-lg text-blue-900">Booking #{getId(booking)}</span>
                    <span className={`font-bold text-lg ${booking.status === "Confirmed" ? "text-green-700" : "text-red-600"}`}>{booking.status}</span>
                  </div>
                  <div className="text-gray-700 mb-2">Passenger: <b>{booking.passenger}</b></div>
                  {flight && (
                    <div className="text-gray-600 mb-2">
                      <b>{flight.from} &rarr; {flight.to}</b> | {flight.date} {flight.time}
                    </div>
                  )}
                  {typeof booking.seat === "number" && seatMap && (
                    <div className="mb-2">
                      <span className="font-semibold text-blue-800">Your Seat: </span>
                      <span className="inline-block bg-blue-100 text-blue-900 px-3 py-1 rounded-full font-bold mr-2">
                        {String.fromCharCode(65 + Math.floor(booking.seat / 6))}{(booking.seat % 6) + 1}
                      </span>
                      <span className="text-xs text-gray-500">(Occupied seats: {seatMap.filter(Boolean).length}/30)</span>
                    </div>
                  )}
                  {seatMap?.length > 0 && (
                    <div className="grid grid-cols-6 gap-1 mb-2">
                      {seatMap.map((seat, i) => (
                        <span key={i} className={`w-7 h-7 flex items-center justify-center rounded text-xs font-bold border ${seat ? (i === booking.seat ? "bg-blue-400 text-white" : "bg-gray-300 text-gray-500") : "bg-white"}`}>{String.fromCharCode(65 + Math.floor(i / 6))}{(i % 6) + 1}</span>
                      ))}
                    </div>
                  )}
                  {booking.status === "Confirmed" && (
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-full font-bold hover:bg-red-800 transition mt-2"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this booking?')) cancelBooking(getId(booking));
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SkyBackground>
  );
}
