import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import * as api from "../api/ars";

const BookingContext = createContext();




export function BookingProvider({ children }) {
  const { user } = useAuth();
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  // Fetch flights from API
  useEffect(() => {
    api.getFlights().then(setFlights);
  }, []);
  // Fetch bookings from API (could filter by user in real app)
  useEffect(() => {
    api.getBookings().then(setBookings);
  }, []);


  const bookFlight = async (flightId, passengerName) => {
    if (!user) return false;
    const bookingData = {
      flightId,
      passenger: passengerName || user.name,
      userEmail: user.email,
    };
    const res = await api.bookFlight(bookingData);
    if (res.success) {
      // Optionally, refetch bookings
      api.getBookings().then(setBookings);
      return res;
    }
    return false;
  };


  // Placeholder: would call API in real app
  const cancelBooking = (bookingId) => {
    setBookings((prev) => prev.map(b => b.id === bookingId ? { ...b, status: "Cancelled" } : b));
  };


  // Admin/staff: would call API in real app
  const addFlight = (flight) => {
    setFlights((prev) => [...prev, { ...flight, id: Date.now() }]);
  };
  const editFlight = (flightId, updates) => {
    setFlights((prev) => prev.map(f => f.id === flightId ? { ...f, ...updates } : f));
  };
  const deleteFlight = (flightId) => {
    setFlights((prev) => prev.filter(f => f.id !== flightId));
    setBookings((prev) => prev.filter(b => b.flight !== flightId));
  };

  return (
    <BookingContext.Provider value={{ flights, bookings, bookFlight, cancelBooking, addFlight, editFlight, deleteFlight }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
