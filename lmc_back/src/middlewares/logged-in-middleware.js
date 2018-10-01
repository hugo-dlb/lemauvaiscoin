const jwt = require('jsonwebtoken');
const constants = require('../config');

// make sure that a token is present in the request headers and valid
exports.loggedInMiddleware = function(req, res, next) {
	if (!req.headers.authorization || !(req.headers.authorization.split(' ')[0] === 'Bearer')) {
		return res.status(403).json({
			success: false,
			message: 'Failed to get an access token.',
			data: null
		});
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, constants.JWT_SECRET);
		next();
	} catch(err) {
		if (err.name === 'TokenExpiredError') {
			return res.status(401).json({
				success: false,
				message: 'Expired token.',
				data: null
			});
		} else {
			return res.status(403).json({
				success: false,
				message: 'Failed to verify token.',
				data: null
			});
		}
	}
};