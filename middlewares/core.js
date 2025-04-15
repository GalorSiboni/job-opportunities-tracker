const cors = require("cors");
const express = require("express");
const logger = require("./logger");

function setupMiddlewares(app) {
	app.use(cors);
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(logger);
	app.use((req, res, next) => {
		req.requestTime = new Date().toISOString();
		next();
	});
}

module.exports = setupMiddlewares;
