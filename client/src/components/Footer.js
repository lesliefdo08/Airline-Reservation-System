import React from "react";

export default function Footer() {
  return (
  <footer className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white py-4 text-center shadow-lg border-t border-blue-800">
      <div className="container mx-auto">
        <span className="font-semibold">Airline Reservation System</span> &copy; {new Date().getFullYear()}<br />
        <span className="text-sm">Made by Leslie Fernando, Glenn Fernando, and Kenneth Fernandes</span>
      </div>
    </footer>
  );
}
