const mongoose = require("mongoose");

const mongoDB = process.env.DataBase || "mongodb://127.0.0.1/jobs-in-progress";

async function main() {
	await mongoose.connect(mongoDB);
}
