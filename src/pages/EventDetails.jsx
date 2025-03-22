import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { eventCode } = useParams();
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleSaveDetails = async () => {
    if (!eventDescription.trim() || !eventDate.trim()) {
      return alert("Please fill all details!");
    }

    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventCode}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: eventDescription, date: eventDate }),
      });

      if (response.ok) {
        alert("Event details saved!");
      } else {
        alert("Failed to save event details.");
      }
    } catch (error) {
      console.error("Error saving event details:", error);
    }
  };

  return (
    <div>
      <h1>Fill Event Details</h1>
      <p>Event Code: {eventCode}</p>

      <input
        type="text"
        placeholder="Event Description"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
      />

      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />

      <button onClick={handleSaveDetails}>Save Details</button>
    </div>
  );
};

export default EventDetails;
