const db = require("../models");

exports.createEvent = async (req, res) => {
  try {
    const { name, description, event_date, capacity, location } = req.body;

    const newEvent = await db.Event.create({
      name,
      description,
      event_date,
      capacity,
      location,
      created_by: req.userId,
    });

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create event", details: error.message });
  }
};

exports.getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await db.Event.findOne({
      where: { event_id: eventId },
      include: [
        { model: db.User, attributes: ["first_name", "last_name", "email"] },
      ],
    });

    if (!event) return res.status(404).json({ error: "Event not found" });

    res.status(200).json({ event });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch event details", details: error.message });
  }
};
