const express = require("express");
const connectDB = require("./database/db");
const setupMiddlewares = require("./middlewares/core");
const errorHandler = require("./middlewares/errorHandler");
const jobRoutes = require("./routes/jobRoutes");
const eventRoutes = require("./routes/eventRoutes");
const redisService = require("./services/RedisService");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Setup middlewares
setupMiddlewares(app);

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/events", eventRoutes);

app.get("/error", (req, res) => {
	throw new Error("Something went wrong!");
});

app.get("/api", (req, res) => {
	res.json("Hello from server!");
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

// Handle application shutdown
process.on("SIGINT", async () => {
	console.log("Shutting down server...");
	await redisService.client.quit();
	process.exit(0);
});
