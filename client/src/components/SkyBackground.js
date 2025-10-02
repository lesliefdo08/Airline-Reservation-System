import React from "react";

export default function SkyBackground({ children }) {
  return (
    <div className="relative w-full min-h-[70vh] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <div className="absolute left-1/2 top-24 -translate-x-1/2 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-40 z-0" />
      <div className="absolute left-10 top-20 w-56 h-24 bg-white/60 rounded-full blur-2xl z-10" />
      <div className="absolute right-20 top-40 w-80 h-32 bg-white/40 rounded-full blur-3xl z-10" />
      <div className="absolute left-1/3 bottom-10 w-72 h-20 bg-white/50 rounded-full blur-2xl z-10" />
      <div className="absolute right-1/4 bottom-24 w-52 h-16 bg-white/30 rounded-full blur-2xl z-10" />
      <div className="absolute left-1/4 top-1/2 w-32 h-10 bg-white/30 rounded-full blur-xl z-10" />
      <div className="absolute right-1/3 top-1/3 w-24 h-8 bg-white/20 rounded-full blur-lg z-10" />
      {children}
    </div>
  );
}
