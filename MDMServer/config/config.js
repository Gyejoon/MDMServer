
/*
 * 설정
 */

module.exports = {
	server_port: 3001,
	db_url: 'mongodb://192.168.0.13:27017/shopping',
	db_schemas: [
	    {file:'./user_schema', collection:'users6', schemaName:'UserSchema', modelName:'UserModel'},
		//{file:'../database/user', collection:'users', schemaName:'Schema', modelName:'User'}
	],
	route_info: [
	],
	facebook: {		// passport facebook
		clientID: '1442860336022433',
		clientSecret: '13a40d84eb35f9f071b8f09de10ee734',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {		// passport twitter
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/twitter/callback'
	},
	google: {		// passport google
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/google/callback'
	},
	jsonrpc_api_path :'/api'
};