// src/components/FeedbackList.jsx
import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import "../styles/feedback.css";

const FeedbackList = ({ eventId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("newFeedback", (data) => {
      if (data.eventId === eventId) {
        setFeedbacks((prev) => [data, ...prev]);
      }
    });

    return () => socket.off("newFeedback");
  }, [eventId, socket]);

  return (
    <div className="feedback-list">
      <h3>Live Feedback</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        feedbacks.map((f, i) => <p key={i}>{f.message}</p>)
      )}
    </div>
  );
};

export default FeedbackList;
