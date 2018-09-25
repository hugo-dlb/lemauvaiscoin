const AuthenticationService = require('../services/authentication-service');

// login
exports.login = function(req, res) {
	const token = AuthenticationService.authenticateUser(req.body.username, req.body.password);

	if (token) {
		res.send(token);
	} else {
		res.status(401).send('Unauthorized');
	}
};

// register
exports.register = function(req, res) {
	const user = AuthenticationService.registerUser(req.body.username, req.body.password);

	if (user) {
		res.send(user);
	} else {
		res.status(401).send('Unauthorized');
	}
};