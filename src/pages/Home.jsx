// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const Home = () => {
  const [eventCode, setEventCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (eventCode) navigate(`/event/${eventCode}`);
  };

  return (
    <div className="home-container">
      <h1>Join an Event</h1>
      <input
        type="text"
        placeholder="Enter Event Code"
        value={eventCode}
        onChange={(e) => setEventCode(e.target.value)}
      />
      <button onClick={handleJoin}>Join Event</button>
    </div>
  );
};

export default Home;
