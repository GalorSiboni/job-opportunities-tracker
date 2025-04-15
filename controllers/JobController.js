const JobService = require("../services/JobService");
const jobService = new JobService();

class JobController {
	static async createJob(req, res) {
		try {
			const job = await jobService.addJob(req.body);
			res.status(201).json(job);
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	}

	static async updateJob(req, res) {
		const { id } = req.params;
		try {
			const updatedJob = await jobService.updateJob(id, req.body);
			res.json(updatedJob);
		} catch (err) {
			if (err.message.includes("not found")) {
				return res.status(404).json({ error: err.message });
			}
			res.status(400).json({ error: err.message });
		}
	}

	static async deleteJob(req, res) {
		const { id } = req.params;
		try {
			const deletedJob = await jobService.deleteJob(id);
			res.json({ message: "Job deleted successfully", job: deletedJob });
		} catch (err) {
			if (err.message.includes("not found")) {
				return res.status(404).json({ error: err.message });
			}
			res.status(400).json({ error: err.message });
		}
	}

	static async getAllJobs(req, res) {
		try {
			const jobs = await jobService.getAllJobs();
			res.json(jobs);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	static async getJob(req, res) {
		const { id } = req.params;
		try {
			const job = await jobService.getJob(id);
			res.json(job);
		} catch (err) {
			if (err.message.includes("not found")) {
				return res.status(404).json({ error: err.message });
			}
			res.status(500).json({ error: err.message });
		}
	}
}

module.exports = JobController;
