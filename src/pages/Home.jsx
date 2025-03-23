import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // Import the updated CSS file

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
    <div className="container">
      {/* Left Side - Event Creation and Joining */}
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

      {/* Right Side - Feedback Section */}
      <div className="feedback-container">
        <h2 className="feedback-title">Attendee Experiences</h2>

        {/* Sample Feedback Entries */}
        <div className="feedback-box">
          <p className="event-name">Tech Innovators Summit 2025</p>
          <p className="user-name">John Doe</p>
          <p className="feedback-text">
            "A fantastic event filled with insightful discussions and networking opportunities. The keynote speakers were inspiring, and the panel discussions provided deep industry insights."
          </p>
        </div>

        <div className="feedback-box">
          <p className="event-name">Startup Growth Conference</p>
          <p className="user-name">Sarah Lee</p>
          <p className="feedback-text">
            "Loved the energy and enthusiasm! It was amazing to connect with like-minded entrepreneurs and learn strategies to scale startups effectively."
          </p>
        </div>

        <div className="feedback-box">
          <p className="event-name">AI & Data Science Forum</p>
          <p className="user-name">Michael Smith</p>
          <p className="feedback-text">
            "Great event with engaging workshops and hands-on sessions. The practical insights on AI advancements were extremely valuable for my research."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
