module.exports = app => {
	const washers = require("../controllers/washer.controller.js");

	const router = require("express").Router();

	// Create a new washer
	router.post("/", washers.create);

	// Retrieve all washers
	router.get("/", washers.findAll);

	// Retrieve a single washer with id
	router.get("/:id", washers.findOne);

	// Update a washer with id
	router.put("/:id", washers.update);

	// Delete a washer with id
	router.delete("/:id", washers.delete);

	app.use('/api/washers', router);
};