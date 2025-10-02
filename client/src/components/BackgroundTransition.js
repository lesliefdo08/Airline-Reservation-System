import React from "react";

export default function BackgroundTransition({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      {children}
    </div>
  );
}
