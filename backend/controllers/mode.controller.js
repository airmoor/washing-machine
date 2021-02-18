const db = require("../models");
const Mode = db.modes;
const Op = db.Sequelize.Op;
const sequelize = require("sequelize");

// Create and save a new Mode
exports.create = (req, res) => {

	if (!req.body.name) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	// Create a new Mode
	const newMode = {
		name: req.body.name,
		duration: req.body.duration,
		temperature: req.body.temperature,
		spinSpeed: req.body.spinSpeed
	};

	// Save Mode in the database
	Mode.create(newMode)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			if (err instanceof sequelize.UniqueConstraintError) {

				//todo: передавать на фронт ошибку
				res.status(500).json({
					error: 'Some error occurred while creating the Mode.',
					message:
						err.message || "duplicate error"
				})
			} else
				res.status(500).send({
					error: 'Some error occurred while creating the Mode.',
					message:
						err.message || "Some error occurred while creating the Mode."
				});
		});
};

// Retrieve all Modes from the database.
exports.findAll = (req, res) => {
	const searched = req.query.name;

	if (searched) {
		if (typeof searched === 'string') searched.toLowerCase();
	}
	const condition = searched ? { name: { [Op.iLike]: `%${searched}%` } } : null;

	Mode.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials."
			});
		});
};

// Find a single Mode with an id
exports.findOne = (req, res) => {
	const id = req.params.id;
	Mode.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Mode with id=" + id
			});
		});
};

// Update a Mode by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Mode.update(req.body, {
		where: {id: id}
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Mode was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Mode with id=${id}. Maybe Mode was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Mode with id=" + id
			});
		});
};

// Delete a Mode with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Mode.destroy({
		where: {id: id}
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Mode was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Mode with id=${id}. Maybe Mode was not found!`,
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Mode with id=" + id
			});
		})
};

