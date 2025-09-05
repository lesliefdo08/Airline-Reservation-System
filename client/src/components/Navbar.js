import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";
  return (
    <nav className="backdrop-blur-md bg-blue-900/80 text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-blue-700/40 sticky top-0 z-50">
      <div className="flex items-center gap-2">
  <img src="/arslogo.png" alt="ARS Logo" className="w-8 h-8 drop-shadow-md" />
  <span className="font-extrabold text-2xl tracking-widest text-teal-300 drop-shadow">LGK's Airline Reservation System</span>
      </div>
      <div className="space-x-2 md:space-x-4 flex items-center">
        <Link
          to="/"
          className={`px-3 py-1 rounded transition font-semibold hover:bg-teal-300/20 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/60 relative ${
            location.pathname === "/" ? "text-teal-200" : ""
          }`}
        >
          Home
          {location.pathname === "/" && <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-400 rounded-full animate-underline" />}
        </Link>
        <Link
          to="/flights"
          className={`px-3 py-1 rounded transition font-semibold hover:bg-teal-300/20 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/60 relative ${
            location.pathname === "/flights" ? "text-teal-200" : ""
          }`}
        >
          Flights
          {location.pathname === "/flights" && <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-400 rounded-full animate-underline" />}
        </Link>
        <Link
          to="/status"
          className={`px-3 py-1 rounded transition font-semibold hover:bg-teal-300/20 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/60 relative ${
            location.pathname === "/status" ? "text-teal-200" : ""
          }`}
        >
          Flight Status
          {location.pathname === "/status" && <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-400 rounded-full animate-underline" />}
        </Link>
        <Link
          to="/faq"
          className={`px-3 py-1 rounded transition font-semibold hover:bg-teal-300/20 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/60 relative ${
            location.pathname === "/faq" ? "text-teal-200" : ""
          }`}
        >
          FAQ
          {location.pathname === "/faq" && <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-400 rounded-full animate-underline" />}
        </Link>
        <Link
          to="/help"
          className={`px-3 py-1 rounded transition font-semibold hover:bg-teal-300/20 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/60 relative ${
            location.pathname === "/help" ? "text-teal-200" : ""
          }`}
        >
          Help
          {location.pathname === "/help" && <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-400 rounded-full animate-underline" />}
        </Link>
        {isAdmin && (
          <Link
            to="/admin-guide"
            className={`px-3 py-1 rounded transition font-semibold hover:bg-teal-300/20 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/60 relative ${
              location.pathname === "/admin-guide" ? "text-teal-200" : ""
            }`}
          >
            Admin Guide
            {location.pathname === "/admin-guide" && <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-400 rounded-full animate-underline" />}
          </Link>
        )}
        {user && (
          <Link
            to="/bookings"
            className={`px-3 py-1 rounded transition font-semibold hover:bg-teal-300/20 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/60 relative ${
              location.pathname === "/bookings" ? "text-teal-200" : ""
            }`}
          >
            My Bookings
            {location.pathname === "/bookings" && <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-400 rounded-full animate-underline" />}
          </Link>
        )}
        {isAdmin && (
          <Link
            to="/admin"
            className={`px-3 py-1 rounded transition font-semibold hover:bg-teal-300/20 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/60 relative ${
              location.pathname === "/admin" ? "text-teal-200" : ""
            }`}
          >
            Admin
            {location.pathname === "/admin" && <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-400 rounded-full animate-underline" />}
          </Link>
        )}
        {!user ? (
          <Link
            to="/login"
            className={`px-3 py-1 rounded transition font-semibold hover:bg-teal-300/20 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-300/60 relative ${
              location.pathname === "/login" || location.pathname === "/register" ? "text-teal-200" : ""
            }`}
          >
            Login
            {(location.pathname === "/login" || location.pathname === "/register") && <span className="absolute left-0 right-0 -bottom-1 h-1 bg-teal-400 rounded-full animate-underline" />}
          </Link>
        ) : (
          <button
            onClick={logout}
            className="px-3 py-1 rounded transition font-semibold bg-yellow-300/20 text-yellow-200 hover:bg-yellow-300/40 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300/60 shadow"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
