import React from "react";
import SkyBackground from "../components/SkyBackground";

export default function FAQ() {
  return (
    <SkyBackground>
      <div className="container mx-auto py-12 min-h-[60vh] flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-6 text-white drop-shadow">Frequently Asked Questions</h2>
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 w-full max-w-2xl animate-fade-in space-y-6">
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">How do I book a flight?</h3>
            <p>Go to the Flights page, search for your desired route and date, select a flight, choose your seat, and proceed to payment.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">How can I change or cancel my booking?</h3>
            <p>Visit the My Bookings page, select the booking you wish to modify, and follow the on-screen instructions.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">What if I forget my password?</h3>
            <p>Click on 'Forgot Password' on the login page and follow the instructions to reset your password.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">How do I contact support?</h3>
            <p>Use the live chat widget at the bottom right or email us at support@ars.com for assistance.</p>
          </div>
        </div>
      </div>
    </SkyBackground>
  );
}
