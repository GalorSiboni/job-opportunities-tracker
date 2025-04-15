const mongoose = require("mongoose");

const mongoDB = process.env.DataBase || "mongodb://127.0.0.1/jobs-in-progress";

async function connectDB() {
	try {
		await mongoose.connect(mongoDB);
		console.log("MongoDB connected successfully");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1); // Exit with failure
	}
}

module.exports = connectDB;
