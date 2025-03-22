import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // Import CSS file

const Home = () => {
  const [eventName, setEventName] = useState("");
  const [eventCode, setEventCode] = useState("");
  const navigate = useNavigate();

  // Function to create a new event
  const handleCreateEvent = async () => {
    if (!eventName.trim()) {
      alert("Event name is required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: eventName }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate(`/event-details/${data.eventCode}`); // Redirect to event details page
      } else {
        alert(data.message || "Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Function to join an existing event
  const handleJoinEvent = () => {
    if (!eventCode.trim()) {
      alert("Event code is required!");
      return;
    }
    navigate(`/event/${eventCode}`);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Real-Time Feedback</h1>

      {/* Create Event Section */}
      <div className="home-section">
        <h2>Create an Event</h2>
        <input
          type="text"
          placeholder="Enter event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <button className="btn" onClick={handleCreateEvent}>Create Event</button>
      </div>

      {/* Join Event Section */}
      <div className="home-section">
        <h2>Join an Event</h2>
        <input
          type="text"
          placeholder="Enter event code"
          value={eventCode}
          onChange={(e) => setEventCode(e.target.value)}
        />
        <button className="btn" onClick={handleJoinEvent}>Join Event</button>
      </div>
    </div>
  );
};

export default Home;
