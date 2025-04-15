const express = require("express");
const router = express.Router();
const { Job } = require("../models/Job");

// Create job opportunity
router.post("/", async (req, res) => {
	try {
		const job = await Job.create(req.body);
		res.status(201).json(job);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Update job opportunity by ID
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!updatedJob) {
			return res.status(404).json({ error: "Job not found" });
		}
		res.json(updatedJob);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Delete job opportunity by ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deletedJob = await Job.findByIdAndDelete(id);
		if (!deletedJob) {
			return res.status(404).json({ error: "Job not found" });
		}
		res.json({ message: "Job deleted successfully", job: deletedJob });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Get all job opportunities
router.get("/", async (req, res) => {
	try {
		const jobs = await Job.find().sort({ createdAt: -1 }); // most recent first
		res.json(jobs);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get job opportunity by ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const job = await Job.findById(id);
		if (!job) {
			return res.status(404).json({ error: "Job not found" });
		}
		res.json(job);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
