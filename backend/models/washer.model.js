module.exports = (sequelize, Sequelize) => {
	const Washer = sequelize.define("washer", {
		name: {
			type: Sequelize.STRING,
		},
		hash: {
			type: Sequelize.STRING,
		},
		model: {
			type: Sequelize.STRING
		},
		isWorking: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: true,
		},
		lastWorkingTime: {
			type: 'TIMESTAMP',
			allowNull: true,
		},
		lastModeId: {
			type: Sequelize.INTEGER,
			allowNull: true,
		}
		//todo:
		// all last working data
		// set schedule
		// delayed start
		// model id + one-to-many

	});
	return Washer;
};