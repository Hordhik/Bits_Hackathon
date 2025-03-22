import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find(); // Fetch events from DB
        res.json(events); // Send events to frontend
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

exports.giveFeedback = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    event.feedbacks.push({ user: req.user.id, comment, rating });
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error submitting feedback", error });
  }
};
