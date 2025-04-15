const cors = require("cors");
const express = require("express");
const logger = require("./logger");

function setupMiddlewares(app) {
	app.use(cors);
	app.use(express.json());
	app.use(logger);
}

module.exports = setupMiddlewares;
