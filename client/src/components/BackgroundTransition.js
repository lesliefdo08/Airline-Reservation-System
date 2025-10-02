import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const gradients = [
  "from-blue-900 via-blue-700 to-cyan-400",
  "from-purple-800 via-pink-500 to-yellow-300",
  "from-green-700 via-cyan-400 to-blue-200",
  "from-yellow-400 via-orange-500 to-pink-500",
  "from-blue-800 via-indigo-500 to-purple-400",
];

export default function BackgroundTransition({ children }) {
  const [index, setIndex] = useState(0);
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    if (!isAuthPage) {
      const interval = setInterval(() => setIndex((i) => (i + 1) % gradients.length), 7000);
      return () => clearInterval(interval);
    }
  }, [isAuthPage]);

  return (
    <div className={`min-h-screen transition-all duration-1000 bg-gradient-to-br ${isAuthPage ? "from-blue-900 via-blue-700 to-cyan-400" : gradients[index]}`}>
      {children}
    </div>
  );
}
