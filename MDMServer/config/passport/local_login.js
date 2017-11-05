
/*
 * Passport - Local 설정
 */

const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

module.exports = new LocalStrategy({
	usernameField : 'employee_num',
	passwordField : 'Password',
	passReqToCallback : true 
}, function(req, emp, password, done) { 
	console.log('passport의 local-login 호출됨');
	
	password = crypto.createHash('sha256').update(password).digest('hex');
	
	const database = req.app.get('database');    	
    database.getConnection(function(err, connection){
    	if(err){
    		connection.release();
    		return done(err);
    	}
    	connection.query('select employee_num, Name, Rank, Department, ' +
    			'Date_of_birth, Address, device_info.created_at, OTP from user_info ' +
    			'inner join device_info ' +
    			'on employee_num = User_info_employee_num ' +
    			'where employee_num = ? and Password = ?;',[
    				emp, password
    			], function(err, user){
    		if(err){
    			connection.release();
    			return done(err);
    		}
    		if(!user[0]){
    			console.log('로그인 실패.');
    			connection.release();
    			return done(null, false, req.flash('loginMessage', '사원번호가 없거나 비밀번호가 일치하지 않습니다.'));
    		}
    		console.log('로그인 성공');
    		connection.release();
    		return done(null, user);
    	});
    });
});
