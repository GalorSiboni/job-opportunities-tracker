const EventService = require("../services/EventService");
const eventService = new EventService();

class EventController {
	static async createEvent(req, res) {
		try {
			const event = await eventService.addEvent(req.body);
			res.status(201).json(event);
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	}

	static async updateEvent(req, res) {
		const { id } = req.params;
		try {
			const updatedEvent = await eventService.updateEvent(id, req.body);
			res.json(updatedEvent);
		} catch (err) {
			if (err.message.includes("not found")) {
				return res.status(404).json({ error: err.message });
			}
			res.status(400).json({ error: err.message });
		}
	}

	static async deleteEvent(req, res) {
		const { id } = req.params;
		try {
			const deletedEvent = await eventService.deleteEvent(id);
			res.json({ message: "Event deleted successfully", event: deletedEvent });
		} catch (err) {
			if (err.message.includes("not found")) {
				return res.status(404).json({ error: err.message });
			}
			res.status(400).json({ error: err.message });
		}
	}

	static async getAllEvents(req, res) {
		try {
			const events = await eventService.getAllEvents();
			res.json(events);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	static async getEvent(req, res) {
		const { id } = req.params;
		try {
			const event = await eventService.getEvent(id);
			res.json(event);
		} catch (err) {
			if (err.message.includes("not found")) {
				return res.status(404).json({ error: err.message });
			}
			res.status(500).json({ error: err.message });
		}
	}

	static async getEventsByJobId(req, res) {
		try {
			const events = await eventService.getEventsByJobId(req.params.jobId);
			res.json(events);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

module.exports = EventController;
