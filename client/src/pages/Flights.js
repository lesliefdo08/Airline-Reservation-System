
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import SkyBackground from "../components/SkyBackground";
import SeatMap from "../components/SeatMap";
import { getSeatMap, bookFlightWithSeat } from "../api/seats";

const getId = obj => obj?._id || obj?.id;


export default function Flights() {
  const { flights } = useBooking();
  const { user } = useAuth();
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [seatMap, setSeatMap] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetModalState = () => {
    setShowPayment(false);
    setBookingSuccess(false);
    setPaymentProcessing(false);
    setSelectedSeat(null);
  };

  const handleBook = async (flight) => {
    if (!user) {
      setShowModal(false);
      setTimeout(() => (window.location.href = "/login"), 400);
      return;
    }
    setSelected(flight);
    setShowModal(true);
    resetModalState();
    setLoading(true);
    setSeatMap(await getSeatMap(getId(flight)));
    setLoading(false);
  };

  const handlePayment = async () => {
    setPaymentProcessing(true);
    const res = await bookFlightWithSeat({
      flightId: getId(selected),
      passenger: user.name,
      userEmail: user.email,
      seat: selectedSeat,
    });
    setPaymentProcessing(false);
    setShowPayment(false);
    if (res.success) {
      setBookingSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setBookingSuccess(false);
      }, 1200);
    }
  };

  return (
    <SkyBackground>
      <div className="container mx-auto relative z-20 py-8 px-2 sm:py-12 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 md:mb-8 text-teal-200 drop-shadow">Available Flights</h2>
        {flights.length === 0 ? (
          <div className="text-center text-gray-100">No flights found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {flights.map(flight => (
              <div key={getId(flight)} className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 hover:scale-105 hover:shadow-2xl transition-all duration-200 border-t-4 border-teal-400">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-1 sm:gap-0">
                  <span className="font-semibold text-base sm:text-lg text-white">{flight.from} &rarr; {flight.to}</span>
                  <span className="text-teal-200 font-bold text-lg sm:text-xl">{flight.price}</span>
                </div>
                <div className="text-gray-100 mb-2 text-sm sm:text-base">Date: <b>{flight.date}</b> | Time: <b>{flight.time}</b></div>
                <button
                  className="bg-teal-400 text-blue-900 px-4 py-2 sm:px-6 rounded-full font-bold mt-2 hover:bg-teal-500 hover:text-white transition-all shadow-lg text-sm sm:text-base"
                  onClick={() => handleBook(flight)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Booking Modal */}
        {showModal && selected && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in px-2">
            {loading ? (
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-xs sm:max-w-md w-full border-t-4 border-teal-400 flex items-center justify-center min-h-[200px]">
                <Spinner />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-xs sm:max-w-md w-full border-t-4 border-teal-400 relative">
                <button className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500" onClick={() => setShowModal(false)}>&times;</button>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-800">{showPayment ? "Payment" : "Confirm Booking"}</h3>
                <div className="mb-4 text-gray-700 text-sm sm:text-base">
                  <div><b>From:</b> {selected.from}</div>
                  <div><b>To:</b> {selected.to}</div>
                  <div><b>Date:</b> {selected.date}</div>
                  <div><b>Time:</b> {selected.time}</div>
                  <div><b>Price:</b> {selected.price}</div>
                </div>
                {/* Seat selection */}
                {seatMap?.length > 0 && !showPayment && !bookingSuccess && (
                  <div>
                    <div className="mb-2 font-semibold text-blue-800">Select your seat:</div>
                    <SeatMap seats={seatMap} selected={selectedSeat} onSelect={setSelectedSeat} />
                  </div>
                )}
                {bookingSuccess ? (
                  <div className="text-green-600 font-bold text-base sm:text-lg animate-fade-in">Booking Confirmed!</div>
                ) : showPayment ? (
                  <div>
                    <div className="mb-4 text-center">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-2 sm:px-4 sm:py-2 rounded-full font-bold mb-2 text-xs sm:text-base">Secure Payment Gateway</span>
                      <div className="text-gray-500 text-xs sm:text-sm mb-2">Your payment is processed securely and your booking is confirmed instantly.</div>
                    </div>
                    <button
                      className="w-full bg-teal-400 text-blue-900 py-2 rounded-full font-bold hover:bg-teal-500 hover:text-white transition mb-2 disabled:opacity-60 text-sm sm:text-base"
                      onClick={handlePayment}
                      disabled={paymentProcessing || selectedSeat === null}
                    >
                      {paymentProcessing ? <Spinner className="inline-block align-middle mr-2" /> : null}
                      {paymentProcessing ? "Processing..." : "Pay & Confirm"}
                    </button>
                  </div>
                ) : (
                  <button className="w-full bg-blue-700 text-white py-2 rounded-full font-bold hover:bg-blue-900 transition text-sm sm:text-base" onClick={() => setShowPayment(true)} disabled={selectedSeat === null}>
                    Proceed to Payment
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </SkyBackground>
  );
}
