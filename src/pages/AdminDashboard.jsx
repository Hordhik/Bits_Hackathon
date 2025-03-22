// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="admin">
      <h2>Admin Dashboard</h2>
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
  );
};

export default AdminDashboard;
