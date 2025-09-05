
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import Bookings from "./pages/Bookings";
import Admin from "./pages/Admin";
import AuthPage from "./pages/AuthPage";
import FlightStatus from "./pages/FlightStatus";
import FAQ from "./pages/FAQ";
import Help from "./pages/Help";
import AdminGuide from "./pages/AdminGuide";
import BackgroundTransition from "./components/BackgroundTransition";
import LiveChatWidget from "./components/LiveChatWidget";

function App() {
  return (
    <Router>
      <BackgroundTransition>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/status" element={<FlightStatus />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help" element={<Help />} />
              <Route path="/admin-guide" element={<AdminGuide />} />
            </Routes>
          </main>
          <Footer />
          <LiveChatWidget />
        </div>
      </BackgroundTransition>
    </Router>
  );
}

export default App;
