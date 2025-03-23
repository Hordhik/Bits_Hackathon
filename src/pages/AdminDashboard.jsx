import { useEffect, useState } from "react";
import { fetchEvents } from "../api/events";

function AdminDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(() => alert("Error fetching events"));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {events.length ? (
        <ul>
          {events.map((event) => (
            <li key={event._id}>{event.title} - {event.description}</li>
          ))}
        </ul>
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
}

export default AdminDashboard;
