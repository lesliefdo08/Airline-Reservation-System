
import React, { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";

const getId = obj => obj?._id || obj?.id || obj;

export default function Admin() {
  const { user } = useAuth();
  const { flights, bookings, addFlight, editFlight, deleteFlight } = useBooking();
  const [showAdd, setShowAdd] = useState(false);
  const [newFlight, setNewFlight] = useState({ from: "", to: "", date: "", time: "", price: "" });
  const [editId, setEditId] = useState(null);
  const [editFlightData, setEditFlightData] = useState({ from: "", to: "", date: "", time: "", price: "" });

  if (!user || user.role !== "admin") return <div className="text-center py-16 text-xl text-gray-500">Admin access only.</div>;

  const handleAddFlight = (e) => {
    e.preventDefault();
    addFlight({ ...newFlight, price: Number(newFlight.price) });
    setNewFlight({ from: "", to: "", date: "", time: "", price: "" });
    setShowAdd(false);
  };

  const handleEditFlight = (e) => {
    e.preventDefault();
    editFlight(editId, { ...editFlightData, price: Number(editFlightData.price) });
    setEditId(null);
    setEditFlightData({ from: "", to: "", date: "", time: "", price: "" });
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl font-extrabold mb-8 text-blue-900 drop-shadow">Admin Dashboard</h2>
  <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-700 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="font-bold text-xl text-blue-800">Flights Management</div>
          <button className="bg-blue-700 text-white px-6 py-2 rounded-full font-bold hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-lg" onClick={() => setShowAdd(!showAdd)}>
            {showAdd ? "Cancel" : "Add Flight"}
          </button>
        </div>
        {showAdd && (
          <form onSubmit={handleAddFlight} className="flex flex-wrap gap-4 mb-6">
            <input type="text" placeholder="From" className="px-3 py-2 border rounded" value={newFlight.from} onChange={e => setNewFlight(f => ({ ...f, from: e.target.value }))} required />
            <input type="text" placeholder="To" className="px-3 py-2 border rounded" value={newFlight.to} onChange={e => setNewFlight(f => ({ ...f, to: e.target.value }))} required />
            <input type="date" className="px-3 py-2 border rounded" value={newFlight.date} onChange={e => setNewFlight(f => ({ ...f, date: e.target.value }))} required />
            <input type="time" className="px-3 py-2 border rounded" value={newFlight.time} onChange={e => setNewFlight(f => ({ ...f, time: e.target.value }))} required />
            <input type="number" placeholder="Price" className="px-3 py-2 border rounded" value={newFlight.price} onChange={e => setNewFlight(f => ({ ...f, price: e.target.value }))} required />
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition font-bold" type="submit">Add</button>
          </form>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-t border-blue-200">
            <thead>
              <tr className="bg-blue-200">
                <th className="py-2 px-4">From</th>
                <th className="py-2 px-4">To</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.map(f => (
                <tr key={getId(f)} className="border-b hover:bg-blue-50">
                  <td className="py-2 px-4">{f.from}</td>
                  <td className="py-2 px-4">{f.to}</td>
                  <td className="py-2 px-4">{f.date}</td>
                  <td className="py-2 px-4">{f.time}</td>
                  <td className="py-2 px-4">{f.price}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 transition font-bold" onClick={() => { setEditId(getId(f)); setEditFlightData(f); }}>Edit</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 transition font-bold" onClick={() => {
                      if (window.confirm('Are you sure you want to delete this flight? This cannot be undone.')) deleteFlight(getId(f));
                    }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editId && (
          <form onSubmit={handleEditFlight} className="flex flex-wrap gap-4 mt-4 bg-blue-50 p-4 rounded-xl">
            <input type="text" placeholder="From" className="px-3 py-2 border rounded" value={editFlightData.from} onChange={e => setEditFlightData(f => ({ ...f, from: e.target.value }))} required />
            <input type="text" placeholder="To" className="px-3 py-2 border rounded" value={editFlightData.to} onChange={e => setEditFlightData(f => ({ ...f, to: e.target.value }))} required />
            <input type="date" className="px-3 py-2 border rounded" value={editFlightData.date} onChange={e => setEditFlightData(f => ({ ...f, date: e.target.value }))} required />
            <input type="time" className="px-3 py-2 border rounded" value={editFlightData.time} onChange={e => setEditFlightData(f => ({ ...f, time: e.target.value }))} required />
            <input type="number" placeholder="Price" className="px-3 py-2 border rounded" value={editFlightData.price} onChange={e => setEditFlightData(f => ({ ...f, price: e.target.value }))} required />
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 transition font-bold" type="submit">Save</button>
            <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 transition font-bold" type="button" onClick={() => setEditId(null)}>Cancel</button>
          </form>
        )}
      </div>
  <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-yellow-500">
        <div className="font-bold text-xl text-yellow-800 mb-4">All Bookings</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-t border-yellow-200">
            <thead>
              <tr className="bg-yellow-200">
                <th className="py-2 px-4">Booking ID</th>
                <th className="py-2 px-4">Passenger</th>
                <th className="py-2 px-4">Flight</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => {
                const flight = flights.find(f => getId(f) === getId(b.flight));
                return (
                  <tr key={getId(b)} className="border-b hover:bg-yellow-50">
                    <td className="py-2 px-4">{getId(b)}</td>
                    <td className="py-2 px-4">{b.passenger}</td>
                    <td className="py-2 px-4">{flight ? `${flight.from}  ${flight.to} (${flight.date})` : b.flight}</td>
                    <td className={`py-2 px-4 font-bold ${b.status === "Confirmed" ? "text-green-700" : "text-red-600"}`}>{b.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
