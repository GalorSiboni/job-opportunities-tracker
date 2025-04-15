const mongoose = require("mongoose");

const STATUS_OPTIONS = ["pending", "in-progress", "completed", "cancelled"];

const JobsSchema = new mongoose.Schema({
	description: {
		type: String,
		required: false,
	},
	img: {
		type: String,
		required: false,
	},
	title: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: STATUS_OPTIONS,
		default: "pending",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Job = mongoose.model("Job", JobsSchema);

module.exports = {
	Job,
	STATUS_OPTIONS,
};
