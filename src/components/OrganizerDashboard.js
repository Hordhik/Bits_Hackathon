import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import '../styles/OrganizerDashboard.css';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
    location: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleOpen = (event = null) => {
    if (event) {
      setSelectedEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        date: new Date(event.date),
        location: event.location,
      });
    } else {
      setSelectedEvent(null);
      setFormData({
        title: '',
        description: '',
        date: new Date(),
        location: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      date: newDate,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEvent) {
        await axios.put(
          `http://localhost:5000/api/events/${selectedEvent._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post('http://localhost:5000/api/events', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      handleClose();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="header-paper">
        <h1 className="header-title">Event Management</h1>
        <button className="create-button" onClick={() => handleOpen()}>
          Create New Event
        </button>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <div className="card-content">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">{event.description}</p>
              <div className="event-info">
                <p>Location: {event.location}</p>
                <p>Date: {new Date(event.date).toLocaleString()}</p>
              </div>
            </div>
            <div className="card-actions">
              <button className="edit-button" onClick={() => handleOpen(event)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(event._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <>
          <div className="dialog-overlay" onClick={handleClose}></div>
          <div className="dialog">
            <div className="dialog-title">
              {selectedEvent ? 'Edit Event' : 'Create New Event'}
            </div>
            <div className="dialog-content">
              <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                  />
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Event Date & Time"
                    value={formData.date}
                    onChange={handleDateChange}
                    slotProps={{ textField: { fullWidth: true, required: true, className: 'form-field' } }}
                  />
                </LocalizationProvider>
                <div className="form-field">
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="dialog-actions">
                  <button type="button" onClick={handleClose} className="cancel-button">
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    {selectedEvent ? 'Update Event' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrganizerDashboard; 