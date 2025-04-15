const express = require("express");
const setupMiddlewares = require("./middlewares/core");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const PORT = process.env.PORT || 5001;
setupMiddlewares(app);

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
