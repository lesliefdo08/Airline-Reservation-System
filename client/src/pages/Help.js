import React from "react";
import SkyBackground from "../components/SkyBackground";

export default function Help() {
  return (
    <SkyBackground>
      <div className="container mx-auto py-12 min-h-[60vh] flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-6 text-white drop-shadow">User & Staff Manual</h2>
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 w-full max-w-2xl animate-fade-in space-y-6">
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">Booking a Flight</h3>
            <ol className="list-decimal ml-6">
              <li>Go to the Flights page and search for your route and date.</li>
              <li>Select a flight and choose your seat.</li>
              <li>Enter passenger details and proceed to payment.</li>
              <li>Receive confirmation and e-ticket via email.</li>
            </ol>
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">Managing Reservations</h3>
            <ol className="list-decimal ml-6">
              <li>Visit the My Bookings page.</li>
              <li>View, change, or cancel your bookings as needed.</li>
            </ol>
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">Admin Features</h3>
            <ol className="list-decimal ml-6">
              <li>Admins can access the Admin Dashboard for user and flight management.</li>
              <li>Generate reports, manage users, and configure system settings.</li>
            </ol>
          </div>
        </div>
      </div>
    </SkyBackground>
  );
}
