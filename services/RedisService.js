const redis = require("redis");

class RedisService {
	constructor() {
		this.client = redis.createClient({
			url: process.env.REDIS_URL || "redis://localhost:6379",
		});

		this.client.on("error", (err) => {
			console.error("Redis Error:", err);
		});

		this.client
			.connect()
			.then(() => {
				console.log("Redis connected successfully");
			})
			.catch((err) => {
				console.error("Redis connection error:", err);
			});
	}

	async get(key) {
		try {
			const data = await this.client.get(key);
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error("Redis get error:", error);
			return null;
		}
	}

	async set(key, value, expireTime = 3600) {
		try {
			await this.client.set(key, JSON.stringify(value), {
				EX: expireTime,
			});
			return true;
		} catch (error) {
			console.error("Redis set error:", error);
			return false;
		}
	}

	async del(key) {
		try {
			await this.client.del(key);
			return true;
		} catch (error) {
			console.error("Redis delete error:", error);
			return false;
		}
	}

	async flush() {
		try {
			await this.client.flushAll();
			return true;
		} catch (error) {
			console.error("Redis flush error:", error);
			return false;
		}
	}
}

module.exports = new RedisService();
