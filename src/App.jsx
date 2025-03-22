// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import React from "react";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

      </Routes>
    </>
  );
}

export default App;
