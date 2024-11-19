const { Event, Ticket, AuditLog } = require("../models");
const { sendEmail } = require("../utils/email");

// Create Event
exports.createEvent = async (req, res) => {
  const { name, date, venue, capacity, budget, organizerId } = req.body;
  try {
    const event = await Event.create({ name, date, venue, capacity, budget, organizerId });

    // Log event creation
    await AuditLog.create({
      action: "CREATE",
      description: `Event '${event.name}' created by user ID: ${organizerId}`,
    });

    // Send notification email
    await sendEmail(event.organizer.email, "Event Created", `Your event '${event.name}' has been created successfully.`);

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Join Event
exports.joinEvent = async (req, res) => {
  const { userId, eventId } = req.body;
  try {
    const event = await Event.findByPk(eventId);

    if (!event) return res.status(404).json({ error: "Event not found" });

    const ticketCount = await Ticket.count({ where: { eventId } });
    if (ticketCount >= event.capacity) return res.status(400).json({ error: "Event is fully booked" });

    const ticket = await Ticket.create({ userId, eventId });
    res.status(201).json({ message: "Successfully joined the event", ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Events
exports.fetchEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
