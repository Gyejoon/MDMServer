var otpadd = {};
var t2 = require('thirty-two');

otpadd.add = function(req, callback){
	const database = req.app.get('database');
	const emp = req.body.employee_num;
	const name = req.body.Name;
	
	database.getConnection(function(err, connection){
		if(err){
			connection.release();
			return callback(err);
		}
		connection.query('select Id from device_info ' +
				'inner join user_info ' + 
				'on employee_num = User_info_employee_num ' +
				'where employee_num = ?;',[
					emp
				], function(err, result){
					if(err){
						connection.release();
						return callback(err);
					}
					valueofsplit(result[0].Id, function(data){
					    var b32 = t2.encode(data);
					    var SendData = {
					    	QR_CODE : 'http://qrcode.kaywa.com/img.php?s=8&d=' + 
					    	encodeURIComponent('otpauth://totp/' + name +'?secret=' + b32),
					    	CR_CODE : b32.toString()
					    };
					    connection.release();
					    return callback(null, SendData);
					});
		});
	});
};

function valueofsplit(data, callback){
	var results = data.split("-");
	var result = "";
	for(var i=1; i<results.length;i++){
		if(i === 3) {continue;}
		result = result.concat(results[i]);
	}
	return callback(result);
}

module.exports = otpadd;
module.exports.valueofsplit = valueofsplit;