const db = require("../models");
const Washer = db.washers;
const Op = db.Sequelize.Op;
const sequelize = require("sequelize");

// Create and Save a new Washer
exports.create = (req, res) => {
	if (!req.body.name) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	// Create a Washer
	const newWasher = {
		name: req.body.name,
		hash: req.body.hash,
		model: req.body.model,
	};

	// Save Washer in the database
	Washer.create(newWasher)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Washer."
			});
		});
};

// Retrieve all Washers from the database.
exports.findAll = (req, res) => {
	Washer.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving Washers."
			});
		});
};

// Find a single Washer with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Washer.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Washer with id=" + id
			});
		});
};

// Update a Washer by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Washer.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Washer was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Washer with id=${id}. Maybe Washer was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Washer with id=" + id
			});
		});
};

// Delete a Washer with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Washer.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Washer was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Washer with id=${id}. Maybe Washer was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Washer with id=" + id
			});
		});
};

// Delete all Washers from the database.
exports.deleteAll = (req, res) => {
	Washer.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Washers were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all washers."
			});
		});
};