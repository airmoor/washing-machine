module.exports = (sequelize, Sequelize) => {
	const Mode = sequelize.define("mode", {
		name: {
			type: Sequelize.STRING,
			unique: {
				msg: "There is already an item that contains the exact same values of the following keys"
			},
		},
		duration: {
			type: Sequelize.INTEGER
		},
		temperature: {
			type: Sequelize.INTEGER
		},
		spinSpeed: {
			type: Sequelize.INTEGER
		}
	});
	return Mode;
};