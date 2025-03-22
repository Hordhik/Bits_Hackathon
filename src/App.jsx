import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import AdminDashboard from "./pages/AdminDashboard";
import EventDetails from "./pages/EventDetails"; // Import new page
import React from "react";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/event-details/:eventCode" element={<EventDetails />} /> {/* New Route */}
      </Routes>
    </>
  );
}

export default App;
