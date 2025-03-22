// src/components/EventCard.jsx
import { Link } from "react-router-dom";
import "../styles/eventcard.css"; // Updated import

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <Link to={`/event/${event.id}`} className="btn">Join Event</Link>
    </div>
  );
};

export default EventCard;
