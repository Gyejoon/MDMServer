
/**
 * Passport 프로젝트
 * 
 * 패스포트를 이용한 로컬 사용자 인증
 * 페이스북으로 로그인, 트위터로 로그인, 구글로 로그인 기능 포함
 * 
 */
//===== 모듈 불러들이기 =====//
const express = require('express')
  , http = require('http')
  , path = require('path');


const config = require('./config/config');
const database = require('./database/database');
const route_loader = require('./routes/route_loader');
const handler_loader = require('./handlers/handler_loader');


const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const expressErrorHandler = require('express-error-handler');


//===== Passport 사용 =====//
const passport = require('passport');
const flash = require('connect-flash');


// 제이슨 사용
const jayson = require('jayson');

//===== Express 서버 객체 만들기 =====//
const app = express();


//===== 뷰 엔진 설정 =====//
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//
console.log('config.server_port : %d', config.server_port);
app.set('port', config.server_port);
app.use('/public', express.static(path.join(__dirname, 'public')));

//===== body-parser, cookie-parser, express-session 사용 설정 =====//
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());

app.use(cookieParser());
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));


//===== Passport 사용 설정 =====//
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//===== 라우터 미들웨어 사용 =====//
app.use(app.router);

//라우팅 정보를 읽어들여 라우팅 설정
route_loader.init(app);

//==== json 관련 라우팅 및 설정 ====// 
var jsonrpc_api_path = config.jsonrpc_api_path || '/api';
handler_loader.init(jayson, app, jsonrpc_api_path);

//===== Passport 관련 라우팅 및 설정 =====//

// 패스포트 설정
var configPassport = require('./config/passport');
configPassport(app, passport);

//패스포트 관련 함수 라우팅
var userPassport = require('./routes/user_passport');
userPassport(app, passport);


//===== 404 에러 페이지 처리 =====//
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//

//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함
process.on('uncaughtException', function (err) {
	console.log('uncaughtException 발생함 : ' + err);
	console.log('서버 프로세스 종료하지 않고 유지함.');
	
	console.log(err.stack);
});

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database.db) {
		database.db.close();
	}
});

// 시작된 서버 객체를 리턴받도록 합니다. 
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

	// 데이터베이스 초기화
	database.init(app, config);
   
});