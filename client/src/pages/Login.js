import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SkyBackground from "../components/SkyBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  // Demo users for testing: admin@ars.com = admin, user@ars.com = user
    setTimeout(() => {
      setLoading(false);
      if (email === "admin@ars.com" && password === "admin123") {
        login({ name: "Admin", email, role: "admin" });
        navigate("/admin");
      } else if (email === "user@ars.com" && password === "user123") {
        login({ name: "Demo User", email, role: "user" });
        navigate("/flights");
      } else {
        setError("Invalid credentials. Try admin@ars.com/admin123 or user@ars.com/user123");
      }
    }, 900);
  };

  return (
    <SkyBackground>
      <div className="flex flex-col items-center justify-center min-h-[70vh] z-20 relative py-12">
        <form onSubmit={handleSubmit} className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-md border-t-4 border-blue-700 animate-fade-in backdrop-blur-md">
          <h2 className="text-3xl font-extrabold mb-6 text-blue-800 tracking-tight text-center">Sign in to your account</h2>
          {error && <div className="text-red-600 mb-4 animate-shake text-center">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-900 transition font-bold text-lg disabled:opacity-60 shadow-md"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="text-sm text-gray-500 mt-4 text-center">Try <b>admin@ars.com/admin123</b> or <b>user@ars.com/user123</b></div>
        </form>
      </div>
    </SkyBackground>
  );
}
