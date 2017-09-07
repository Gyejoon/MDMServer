var otpdao = {};

otpdao.checkforupdate = function(database, Id){
	console.log("otpdao.checkforupdate 호출됨.");
	database.getConnection(function(err, connection){
		if(err){
			connection.release();
			return;
		}
		connection.query("select OTP from device_info where Id = ?",[
			Id
		], function(err, result){
			if(err){
				connection.release();
				return;
			}
			if(result[0].OTP === "NO"){
				connection.query("update device_info set OTP = ? where Id = ?",[
					"YES", Id
				],function(err){
					if(err){
						connection.release();
						return;
					}
				});
			}
		});
	});
};

otpdao.history = function(database, Id, history){
	console.log("otpdao.history 호출됨.");
	database.getConnection(function(err, connection){
		if(err){
			connection.release();
			return;
		}
		connection.query("call device_history(?, ?, ?)",[
			Id, "OTP", history
		], function(err){
			if(err){
				connection.release();
				return;
			}
		});
	});
};

module.exports = otpdao;