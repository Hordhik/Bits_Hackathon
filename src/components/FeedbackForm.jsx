import { useState } from "react";
import { useSocket } from "../context/SocketContext";
import "../styles/feedback.css";

const FeedbackForm = ({ eventId, addFeedback }) => {
  const [message, setMessage] = useState("");
  const socket = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const feedbackData = { eventId, message };
      socket.emit("sendFeedback", feedbackData);
      addFeedback(message); // Add feedback instantly
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
