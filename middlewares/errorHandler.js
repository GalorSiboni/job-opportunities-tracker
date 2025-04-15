function errorHandler(err, req, res, next) {
	console.error("🔥 Error:", err.message);
	res.status(err.status || 5000).json({
		error: {
			message: err.message || "Internal Server Error",
		},
	});
}

module.exports = errorHandler;
