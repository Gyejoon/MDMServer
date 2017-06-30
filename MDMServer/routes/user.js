var listuser = function(req, res){
	console.log('user 모듈안에 있는 listuser 호출됨.');
	
	var database = req.app.get('database');
	if(database){
		database.UserModel.findAll(function(err,results){
			if(err){
				callback(err, null);
				return;
			}
			
			if(results){
				console.dir(results);
				
				res.writeHead('200', {'Content-Type' : 'application/json; charset=utf8'});
				res.write(JSON.stringify(results));
				res.end();
			}else{
				res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'});
				res.write('<h2>사용자 리스트 조회 실패</h2>');
				res.end();
			}
		});
	}else{
		res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'});
		res.write('<h2>사용자 리스트 조회 실패</h2>');
		res.end();
	}
};

module.exports.listuser = listuser;