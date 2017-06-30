
/*
 * 설정
 */

module.exports = {
	server_port: 3001,
	db_url: 'mongodb://localhost:27017/shopping',
	db_schemas: [
	    {file:'./user_schema', collection:'users6', schemaName:'UserSchema', modelName:'UserModel'},
	    {file:'./device_schema', collection:'devices', schemaName:'DeviceSchema', modelName:'DeviceModel'}
		//{file:'../database/user', collection:'users', schemaName:'Schema', modelName:'User'}
	],
	route_info: [
		{file : './user', path : '/process/listuser', method : 'listuser', type: 'post'},
		{file : './device', path : '/process/adddevice', method: 'adddevice', type: 'post'},
		{file : './device', path : '/process/listdevice', method: 'listdevice', type: 'post'},
		{file : './device', path : '/process/register', method: 'register', type:'post'},
		{file : './device', path : '/process/sendall', method: 'sendall', type:'post'}
		
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
	jsonrpc_api_path :'/api',
	fcm_api_key: 'AAAAyWdaDS4:APA91bGlGP6rvDfJRP2VgqVl_pmAkArTdNtkJ3TsB1RJGO59fcACr4b9TPpk1FzJGiKVTLzvo9T-rRDrxBVu4VVKx-40TmBjL8eDYZdyTXItpmEKh1yiit7VCdcrwQVUI_Anqk2Lmq9o'
};