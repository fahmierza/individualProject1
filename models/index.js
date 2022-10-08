const { Sequelize, DataTypes } = require('sequelize');

// sql server
const sequelize = new Sequelize('NodeDB', 'test1', '1234', {
	dialect: 'mssql',
	//host: "192.168.xx",
	dialectOptions: {
	  // Observe the need for this nested `options` field for MSSQL
	  options: {
		// Your tedious options here
		useUTC: false,
		dateFirst: 1,
	  },
	},
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.newss = require('./news')(sequelize, Sequelize);
db.comments = require('./comment')(sequelize, Sequelize);

db.newss.hasMany(db.comments, {as: "comments"})
db.comments.belongsTo(db.newss,{foreignKey:'idnews'});

module.exports = db;