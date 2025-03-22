import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import FeedbackList from "../components/FeedbackList";
import FeedbackForm from "../components/FeedbackForm";
import "../styles/event.css"; // Ensure CSS is imported

const EventPage = () => {
  const { eventId } = useParams();
  const socket = useSocket(); // Use SocketContext
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const eventIdRef = useRef(eventId);

  useEffect(() => {
    if (!socket) return; // Ensure socket exists

    eventIdRef.current = eventId;
    socket.emit("joinEvent", eventId);

    const handleNewFeedback = (data) => {
      if (data.eventId === eventIdRef.current) {
        setFeedbacks((prev) => [data, ...prev]);
      }
    };

    socket.on("newFeedback", handleNewFeedback);
    setLoading(false);

    return () => {
      socket.off("newFeedback", handleNewFeedback);
    };
  }, [eventId, socket]);

  // Function to add feedback instantly
  const addFeedback = (message) => {
    const newFeedback = { eventId, message };
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  return (
    <div className="event-container">
      <h2>Event: {eventId}</h2>

      {loading ? <p>Loading feedback...</p> : <FeedbackList feedbacks={feedbacks} />}
      
      <FeedbackForm eventId={eventId} addFeedback={addFeedback} />
    </div>
  );
};

export default EventPage;
