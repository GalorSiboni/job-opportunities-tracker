const express = require("express");
const router = express.Router();
const { Event } = require("../models/Event");

// Create an event
router.post("/", async (req, res) => {
	try {
		const event = await Event.create(req.body);
		res.status(201).json(event);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Update event by ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedEvent) {
			return res.status(404).json({ error: "Event not found" });
		}
		res.json(updatedEvent);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Delete event by ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deletedEvent = await Event.findByIdAndDelete(id);
		if (!deletedEvent) {
			return res.status(404).json({ error: "Event not found" });
		}
		res.json({ message: "Event deleted successfully", event: deletedEvent });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Get all events
router.get("/", async (req, res) => {
	try {
		const events = await Event.find().sort({ createdAt: -1 });
		res.json(events);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get event by ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const event = await Event.findById(id);
		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}
		res.json(event);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET /jobs/:jobId/events
router.get("/jobs/:jobId/events", async (req, res) => {
	try {
		const events = await Event.find({ jobId: req.params.jobId }).sort({
			date: 1,
		});
		res.json(events);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
