module.exports = (sequelize, Sequelize) => {
	const News = sequelize.define("news", {
		judul: {
			type: Sequelize.TEXT
		},
		author: {
			type: Sequelize.TEXT
		},
		image: {
			type: Sequelize.STRING
		},
		artikel: {
			type: Sequelize.TEXT
		}		
	});

	return News;
};