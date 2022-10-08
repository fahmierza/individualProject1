module.exports = (sequelize, Sequelize) => {
	const Comment = sequelize.define("comment", {
		idnews: {
			type: Sequelize.INTEGER
		},
		nama: {
			type: Sequelize.STRING
		},
		komentar: {
			type: Sequelize.TEXT
		}		
	});

	return Comment;
};