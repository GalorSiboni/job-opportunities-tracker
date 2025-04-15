const Job = require("../models/Job");

class JobService {
	async addJobs() {
		const job = new Job({
			title,
			description,
			Img,
			isInProgress,
		});
		return await jobs.save();
	}

	async getJob(id) {
		const job = await Job.findById(id);
		if (!job) {
			throw new Error(`Job with ID ${id} not found`);
		}
		return job;
	}

	async getAllJobs() {
		return Job.find({ isInProgress: true });
	}
}
