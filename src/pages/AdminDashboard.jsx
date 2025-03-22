import React, { useEffect, useState } from "react";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        const data = await response.json();

        if (response.ok) {
          setEvents(data);
        } else {
          setError("Failed to load events.");
        }
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {loading ? (
        <p className="loading-text">Loading events...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : events.length === 0 ? (
        <p className="no-data">No events available.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Feedback Count</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.feedbackCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
