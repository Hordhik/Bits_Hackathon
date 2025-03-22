// src/pages/EventPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend

const EventPage = () => {
  const { eventId } = useParams();
  const [feedback, setFeedback] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinEvent", eventId);
    
    socket.on("newFeedback", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("newFeedback");
  }, [eventId]);

  const sendFeedback = () => {
    if (feedback.trim()) {
      socket.emit("sendFeedback", { eventId, message: feedback });
      setFeedback("");
    }
  };

  return (
    <div className="event-container">
      <h2>Event: {eventId}</h2>
      <div className="feedback-list">
        {messages.map((msg, index) => (
          <div key={index} className="feedback">{msg.message}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Write your feedback..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={sendFeedback}>Send Feedback</button>
    </div>
  );
};

export default EventPage;
