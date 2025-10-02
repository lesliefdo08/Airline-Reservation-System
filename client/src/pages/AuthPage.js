import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SkyBackground from "../components/SkyBackground";
import axios from "axios";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
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

  const handleRegister = async (e) => {
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
      login({ name: email.split("@")[0], email, role: "user" });
      setTimeout(() => navigate("/flights"), 1200);
    } catch (err) {
      setLoading(false);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <SkyBackground>
      <div className="flex flex-col items-center justify-center min-h-[70vh] z-20 relative py-6 px-2 sm:py-8 sm:px-4">
        <div className="bg-white/90 p-4 sm:p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md border-t-4 border-blue-700 animate-fade-in backdrop-blur-md">
          <div className="flex justify-center mb-4 sm:mb-6 flex-wrap">
            <button
              className={`px-4 py-2 font-bold rounded-l-2xl transition-all text-base md:text-lg ${mode === "login" ? "bg-blue-700 text-white" : "bg-blue-100 text-blue-700"}`}
              onClick={() => { setMode("login"); setError(""); setSuccess(false); }}
              type="button"
            >
              Login
            </button>
            <button
              className={`px-4 py-2 font-bold rounded-r-2xl transition-all text-base md:text-lg ${mode === "register" ? "bg-blue-700 text-white" : "bg-blue-100 text-blue-700"}`}
              onClick={() => { setMode("register"); setError(""); setSuccess(false); }}
              type="button"
            >
              Register
            </button>
          </div>
          {mode === "login" ? (
            <form onSubmit={handleLogin}>
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
                data-cy="login-btn"
                className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-900 transition font-bold text-lg disabled:opacity-60 shadow-md"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <div className="text-sm text-gray-500 mt-4 text-center">Don't have an account? <button type="button" className="text-blue-700 underline" onClick={() => { setMode("register"); setError(""); setSuccess(false); }}>Create one</button></div>
              <div className="text-xs text-gray-400 mt-2 text-center">Try <b>admin@ars.com/admin123</b> or <b>user@ars.com/user123</b></div>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <h2 className="text-3xl font-extrabold mb-6 text-blue-800 tracking-tight text-center">Create your account</h2>
              {success && <div className="text-green-600 mb-4 animate-fade-in text-center">Registration successful! Redirecting...</div>}
              {error && <div className="text-red-600 mb-4 animate-shake text-center">{error}</div>}
              <input
                type="email"
                placeholder="Email (must end with @ars.com)"
                className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                {loading ? "Registering..." : "Register"}
              </button>
              <div className="text-sm text-gray-500 mt-4 text-center">Already have an account? <button type="button" className="text-blue-700 underline" onClick={() => { setMode("login"); setError(""); setSuccess(false); }}>Sign in</button></div>
            </form>
          )}
        </div>
      </div>
    </SkyBackground>
  );
}