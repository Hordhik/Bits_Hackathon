import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reviews, setReviews] = useState({});
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
      
      response.data.forEach(event => {
        fetchReviews(event._id);
      });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchReviews = async (eventId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reviews/event/${eventId}`);
      setReviews(prev => ({
        ...prev,
        [eventId]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setFormData({
      rating: 0,
      comment: '',
    });
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

  const handleRatingChange = (newValue) => {
    setFormData({
      ...formData,
      rating: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/reviews',
        {
          eventId: selectedEvent._id,
          ...formData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleClose();
      fetchReviews(selectedEvent._id);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const calculateAverageRating = (eventId) => {
    const eventReviews = reviews[eventId] || [];
    if (eventReviews.length === 0) return 0;
    const sum = eventReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / eventReviews.length;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : 'empty'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="event-list-container">
      <h1 className="page-title">Available Events</h1>
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
              <div className="rating-box">
                <span className="rating-label">Average Rating:</span>
                <div className="rating-stars">
                  {renderStars(calculateAverageRating(event._id))}
                </div>
                <span className="review-count">
                  ({reviews[event._id]?.length || 0} reviews)
                </span>
              </div>
            </div>
            <div className="card-actions">
              <button
                className="review-button"
                onClick={() => handleOpen(event)}
              >
                Write Review
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
              Review for {selectedEvent?.title}
            </div>
            <div className="dialog-content">
              <form onSubmit={handleSubmit}>
                <div className="rating-container">
                  <legend>Rating</legend>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        className={`star ${value <= formData.rating ? 'filled' : 'empty'}`}
                        onClick={() => handleRatingChange(value)}
                        style={{ cursor: 'pointer' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="comment-field">
                  <textarea
                    name="comment"
                    placeholder="Write your review here..."
                    value={formData.comment}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="dialog-actions">
                  <button type="button" onClick={handleClose} className="cancel-button">
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    Submit Review
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

export default EventList; 