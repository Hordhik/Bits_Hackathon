import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [eventName, setEventName] = useState("");
  const [eventCode, setEventCode] = useState("");
  const navigate = useNavigate();

  // Function to create a new event
  const handleCreateEvent = async () => {
    if (!eventName.trim()) return alert("Event name is required!");
  
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
        alert("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  

  // Function to join an existing event
  const handleJoinEvent = () => {
    if (!eventCode.trim()) return alert("Event code is required!");
    navigate(`/event/${eventCode}`);
  };

  return (
    <div>
      <h1>Welcome to Real-time Feedback</h1>

      {/* Create Event Section */}
      <div>
        <h2>Create an Event</h2>
        <input
          type="text"
          placeholder="Enter event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <button onClick={handleCreateEvent}>Create Event</button>
      </div>

      {/* Join Event Section */}
      <div>
        <h2>Join an Event</h2>
        <input
          type="text"
          placeholder="Enter event code"
          value={eventCode}
          onChange={(e) => setEventCode(e.target.value)}
        />
        <button onClick={handleJoinEvent}>Join Event</button>
      </div>
    </div>
  );
};

export default Home;
