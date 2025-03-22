// src/components/FeedbackForm.jsx
import { useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import "../styles/feedback.css";

const FeedbackForm = ({ eventId }) => {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendFeedback", { eventId, message });
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <textarea
        placeholder="Type your feedback..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="3"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
