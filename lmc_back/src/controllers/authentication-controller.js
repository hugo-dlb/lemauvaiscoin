const AuthenticationService = require('../services/authentication-service');

// login
exports.login = function(req, res) {
	try {
		const token = AuthenticationService.authenticateUser(req.body.username, req.body.password);

		res.send({
			success: true,
			message: null,
			data: {
				token: token
			}
		});
	} catch (err) {
		if (err.message === 'INVALID_PARAMETERS') {
			res.status(400).send({
				success: false,
				message: 'Invalid parameters.',
				data: null
			});
		} else {
			res.status(404).send({
				success: false,
				message: 'Invalid credentials.',
				data: null
			});
		}
	}
};

// register
exports.register = function(req, res) {
	try {
		AuthenticationService.registerUser(req.body.username, req.body.password);

		res.send({
			success: true,
			message: null,
			data: null
		});
	} catch (err) {
		if (err.message === 'INVALID_PARAMETERS') {
			res.status(400).send({
				success: false,
				message: 'Invalid parameters.',
				data: null
			});
		} else {
			res.status(409).send({
				success: false,
				message: 'A user with the given username already exists.',
				data: null
			});
		}
	}
};