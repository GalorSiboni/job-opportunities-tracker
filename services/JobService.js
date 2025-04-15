const { Job } = require("../models/Job");
const redisService = require("./RedisService");

class JobService {
	async addJob(jobData) {
		const job = new Job(jobData);
		const savedJob = await job.save();

		await redisService.del("jobs:all");

		return savedJob;
	}

	async getJob(id) {
		const cacheKey = `job:${id}`;
		const cachedJob = await redisService.get(cacheKey);

		if (cachedJob) {
			return cachedJob;
		}

		const job = await Job.findById(id);
		if (!job) {
			throw new Error(`Job with ID ${id} not found`);
		}

		await redisService.set(cacheKey, job);

		return job;
	}

	async getAllJobs() {
		const cacheKey = "jobs:all";
		const cachedJobs = await redisService.get(cacheKey);

		if (cachedJobs) {
			return cachedJobs;
		}

		const jobs = await Job.find().sort({ createdAt: -1 });

		await redisService.set(cacheKey, jobs, 300);

		return jobs;
	}

	async updateJob(id, updateData) {
		const job = await Job.findByIdAndUpdate(id, updateData, {
			new: true,
			runValidators: true,
		});

		if (!job) {
			throw new Error(`Job with ID ${id} not found`);
		}

		const cacheKey = `job:${id}`;
		await redisService.set(cacheKey, job);

		await redisService.del("jobs:all");

		return job;
	}

	async deleteJob(id) {
		const job = await Job.findByIdAndDelete(id);

		if (!job) {
			throw new Error(`Job with ID ${id} not found`);
		}

		await redisService.del(`job:${id}`);

		await redisService.del("jobs:all");

		return job;
	}
}

module.exports = JobService;
