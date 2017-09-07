
/*
 * database
 */

var mysql = require('mysql');
// database 객체에 db, schema, model 모두 추가
var database = {};

database.init = function(app, config) {
	console.log('init() 호출됨.');
	
	const pool = mysql.createPool(config.mysql);
	
	app.set('database', pool);
};


// database 객체를 module.exports에 할당
module.exports = database;
