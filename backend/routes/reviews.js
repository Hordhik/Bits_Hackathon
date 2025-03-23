const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { auth, requireRole } = require('../middleware/auth');

// Get reviews for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const reviews = await Review.find({ event: req.params.eventId })
      .populate('attendee', 'username')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit a review (attendees only)
router.post('/', auth, requireRole('attendee'), async (req, res) => {
  try {
    const { eventId, rating, comment } = req.body;

    // Check if user has already reviewed this event
    const existingReview = await Review.findOne({
      event: eventId,
      attendee: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this event' });
    }

    const review = new Review({
      event: eventId,
      attendee: req.user._id,
      rating,
      comment,
    });

    await review.save();
    
    const populatedReview = await Review.findById(review._id)
      .populate('attendee', 'username')
      .populate('event', 'title');

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update review (attendees can only update their own reviews)
router.put('/:id', auth, requireRole('attendee'), async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      attendee: req.user._id,
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const { rating, comment } = req.body;
    review.rating = rating;
    review.comment = comment;

    await review.save();
    
    const populatedReview = await Review.findById(review._id)
      .populate('attendee', 'username')
      .populate('event', 'title');

    res.json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete review (attendees can only delete their own reviews)
router.delete('/:id', auth, requireRole('attendee'), async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      attendee: req.user._id,
    });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 