const { Event } = require("../models/Event");
const redisService = require("./RedisService");

class EventService {
	async addEvent(eventData) {
		const event = new Event(eventData);
		const savedEvent = await event.save();

		await redisService.del("events:all");
		await redisService.del(`events:job:${eventData.jobId}`);
		await redisService.del("events:upcoming");

		return savedEvent;
	}

	async getEvent(id) {
		const cacheKey = `event:${id}`;
		const cachedEvent = await redisService.get(cacheKey);

		if (cachedEvent) {
			return cachedEvent;
		}

		const event = await Event.findById(id);
		if (!event) {
			throw new Error(`Event with ID ${id} not found`);
		}

		await redisService.set(cacheKey, event);

		return event;
	}

	async getAllEvents() {
		const cacheKey = "events:all";
		const cachedEvents = await redisService.get(cacheKey);

		if (cachedEvents) {
			return cachedEvents;
		}

		const events = await Event.find().sort({ date: 1 });

		await redisService.set(cacheKey, events, 300);

		return events;
	}

	async getEventsByJobId(jobId) {
		const cacheKey = `events:job:${jobId}`;
		const cachedEvents = await redisService.get(cacheKey);

		if (cachedEvents) {
			return cachedEvents;
		}

		const events = await Event.find({ jobId }).sort({ date: 1 });

		await redisService.set(cacheKey, events, 300);

		return events;
	}

	async updateEvent(id, updateData) {
		const event = await Event.findByIdAndUpdate(id, updateData, {
			new: true,
			runValidators: true,
		});

		if (!event) {
			throw new Error(`Event with ID ${id} not found`);
		}

		await redisService.set(`event:${id}`, event);
		await redisService.del("events:all");
		await redisService.del(`events:job:${event.jobId}`);
		await redisService.del("events:upcoming");

		return event;
	}

	async deleteEvent(id) {
		const event = await Event.findByIdAndDelete(id);

		if (!event) {
			throw new Error(`Event with ID ${id} not found`);
		}

		await redisService.del(`event:${id}`);
		await redisService.del("events:all");
		await redisService.del(`events:job:${event.jobId}`);
		await redisService.del("events:upcoming");

		return event;
	}
}

module.exports = EventService;
