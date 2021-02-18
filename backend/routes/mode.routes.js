module.exports = app => {
	const modes = require("../controllers/mode.controller.js");

	const router = require("express").Router();

	// Create a new mode
	router.post("/", modes.create);

	// Retrieve all modes
	router.get("/", modes.findAll);

	// Retrieve a single mode with id
	router.get("/:id", modes.findOne);

	// Update a mode with id
	router.put("/:id", modes.update);

	// Delete a mode with id
	router.delete("/:id", modes.delete);

	app.use('/api/modes', router);
};