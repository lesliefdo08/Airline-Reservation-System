import React from "react";

export default function Clouds({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-0 ${className}`} aria-hidden="true">
      {/* Cloud 1 */}
      <div className="absolute left-10 top-10 w-48 h-24 bg-white/60 rounded-full blur-2xl animate-cloud-move1" />
      {/* Cloud 2 */}
      <div className="absolute right-20 top-32 w-64 h-28 bg-white/40 rounded-full blur-3xl animate-cloud-move2" />
      {/* Cloud 3 */}
      <div className="absolute left-1/2 bottom-10 w-56 h-20 bg-white/50 rounded-full blur-2xl animate-cloud-move3" />
      {/* Cloud 4 */}
      <div className="absolute right-1/4 bottom-24 w-40 h-16 bg-white/30 rounded-full blur-2xl animate-cloud-move4" />
    </div>
  );
}
