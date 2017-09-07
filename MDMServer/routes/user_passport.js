
/*
 * 데이터베이스 관련 객체들을 init() 메소드로 설정
 * 
 * 데이터베이스 관련 객체들을 req.app.get('database')로 참조
 * 
 */


//===== Passport Authentication =====//

const otpadd = require('../otp/otpadd');
const otpverify = require('../otp/otpverify');

module.exports = function(app, passport) {

	// 홈 화면 - 로그인 링크
	app.get('/', function(req, res) {
		console.log('/ 패스 요청됨.');
			
		if (req.user === undefined) {
			res.render('index.ejs', {login_success:false});
		} else {
			res.render('index.ejs', {login_success:true});
		}
	});

	//로그인 폼 링크
	app.get('/login', function(req, res) {
		console.log('/login 패스 요청됨.');
		res.render('login.ejs', {message: req.flash('loginMessage')});
	});
	 
	// 프로필
	app.get('/profile', function(req, res) {
		if (!req.isAuthenticated()) {
			res.redirect('/login');
		} else {
			console.log('/profile 패스 요청됨.');
			
			if (Array.isArray(req.user)) {
				res.render('profile.ejs', {user: req.user[0]});
			} else {
				res.render('profile.ejs', {user: req.user});
			}
		}
	});
	
	// OTP 등록 페이지
	app.get('/otpadd', function(req, res){
		if(!req.isAuthenticated()){
			res.redirect('/login');
		} else {
			console.log('/otpadd 패스 요청됨.');
			otpadd.add(req, function(err, result){
				if(err){
					throw err;
				}
				res.render('otpadd.ejs', {QR : result.QR_CODE,
					CR : result.CR_CODE});
			});
		}
	});
	
	// 로그아웃
	app.get('/logout', function(req, res) {
		console.log('/logout 패스 요청됨.');
		req.logout();
		res.redirect('/');
	});
	
	// 패스포트 - 로컬 로그인 라우팅 
	app.post('/login',
		passport.authenticate('local-login', {
			successRedirect : '/profile', 
			failureRedirect : '/login', 
			failureFlash : true 
		}), function(req, res){
		res.json({result:'success'});
	});
	
	app.post('/otpverify', function(req, res){
		console.log('/otpverify 패스 요청됨.');
		otpverify.verify(req, function(results){
			res.json({result : results});
		});
	});
};
