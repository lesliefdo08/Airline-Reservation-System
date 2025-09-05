import React from "react";

export default function SeatMap({ seats, selected, onSelect, disabled }) {
  // seats: array of userEmail/null, selected: seat index, onSelect: fn
  return (
    <div className="grid grid-cols-6 gap-2 my-4">
      {seats.map((seat, i) => (
        <button
          key={i}
          className={`w-10 h-10 rounded text-xs font-bold border 
            ${seat ? "bg-gray-300 text-gray-500 cursor-not-allowed" : selected === i ? "bg-teal-400 text-white" : "bg-white hover:bg-blue-100"}`}
          onClick={() => !seat && !disabled && onSelect(i)}
          disabled={!!seat || disabled}
        >
          {String.fromCharCode(65 + Math.floor(i / 6))}{(i % 6) + 1}
        </button>
      ))}
    </div>
  );
}
