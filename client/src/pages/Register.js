import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/register", { name: email.split("@")[0], email, password });
      setLoading(false);
      if (!res.data.success) {
        setError(res.data.message || "Registration failed");
        return;
      }
      setSuccess(true);
      // Auto-login as user
      login({ name: email.split("@")[0], email, role: "user" });
      setTimeout(() => navigate("/flights"), 1200);
    } catch (err) {
      setLoading(false);
      setError("Registration failed. Try again.");
    }
  };

  return (
  <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-blue-700 animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-800 tracking-tight">Register</h2>
        {success ? (
          <div className="text-green-600 mb-4 animate-fade-in">Registration successful! Redirecting...</div>
        ) : (
          <>
            {error && <div className="text-red-600 mb-4 animate-shake">{error}</div>}
            <input
              type="email"
              placeholder="Email (must end with @ars.com)"
              className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-900 transition font-bold text-lg disabled:opacity-60" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
