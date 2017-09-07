const notp = require('notp');
const otpadd = require('./otpadd');
const otpdao = require('../database/otpdao');

var otpverify = {};

otpverify.verify = function(req, callback){
	const database = req.app.get('database');
	const paramId = req.body.Id;
	const paramCode = req.body.Code;
	
	otpadd.valueofsplit(paramId, function(data) {
        if(notp.totp.verify(paramCode, data, {})) {
            console.log('OTP 인증 성공');
            otpdao.checkforupdate(database, paramId);
            otpdao.history(database, paramId, "인증 성공");
            return callback({result : "Success"});
        } else {
            otpdao.history(database, paramId, "인증 실패");
        	return callback({result : "Failed"});
        }
	});
};

module.exports = otpverify;