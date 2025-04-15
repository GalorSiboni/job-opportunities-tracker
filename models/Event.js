const mongoose = require("mongoose");

const EVENT_TYPES = ["phone", "online", "onsite", "assignment"];
const STATUS_OPTIONS = ["scheduled", "rescheduled", "cancelled", "completed"];

const eventSchema = new mongoose.Schema({
	title: { type: String, required: true },
	type: {
		type: String,
		enum: EVENT_TYPES,
		required: true,
	},
	status: {
		type: String,
		enum: STATUS_OPTIONS,
		default: "scheduled",
	},
	date: {
		type: Date,
		required: true,
	},
	notes: String,
	jobId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Job",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Event = mongoose.model("Event", eventSchema);

module.exports = {
	Event,
	EVENT_TYPES,
	STATUS_OPTIONS,
};
