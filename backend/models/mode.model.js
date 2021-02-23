module.exports = (sequelize, Sequelize) => {
	const Mode = sequelize.define("mode", {
		name: {
			type: Sequelize.STRING,
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