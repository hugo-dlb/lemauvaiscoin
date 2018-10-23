const ListingsService = require('../services/listings-service');
const AuthenticationService = require('../services/authentication-service');

// get all listings
exports.index = function(req, res) {
	const listings = ListingsService.index();
	res.send({
		success: true,
		message: null,
		data: {
			listings: listings
		}
	});
};

// get a listing
exports.getListing = function(req, res) {
	try {
		const id = Number.parseInt(req.params.id) || -1;
		const listing = ListingsService.getListing(id);
		res.send({
			success: true,
			message: null,
			data: {
				listing: listing
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
				message: 'Not found.',
				data: null
			});
		}
	}
};

// delete a listing
exports.deleteListing = function(req, res) {
	try {
		const user = AuthenticationService.getUserFromRequest(req);
		const id = Number.parseInt(req.params.id) || -1;
		const listings = ListingsService.deleteListing(user, id);
		res.send({
			success: true,
			message: null,
			data: {
				listings: listings
			}
		});
	} catch (err) {
		if (err.message === 'INVALID_PARAMETERS') {
			res.status(400).send({
				success: false,
				message: 'Invalid parameters.',
				data: null
			});
		} else if (err.message === 'FORBIDDEN') {
			res.status(403).send({
				success: false,
				message: 'Forbidden.',
				data: null
			});
		} else {
			res.status(404).send({
				success: false,
				message: 'Not found.',
				data: null
			});
		}
	}
};

// update a listing
exports.updateListing = function(req, res) {
	try {
		const user = AuthenticationService.getUserFromRequest(req);
		const id = Number.parseInt(req.params.id) || -1;
		const listing = ListingsService.updateListing(user, id, req.body);
		res.send({
			success: true,
			message: null,
			data: {
				listing: listing
			}
		});
	} catch (err) {
		if (err.message === 'INVALID_PARAMETERS') {
			res.status(400).send({
				success: false,
				message: 'Invalid parameters.',
				data: null
			});
		} else if (err.message === 'FORBIDDEN') {
			res.status(404).send({
				success: false,
				message: 'Not found.',
				data: null
			});
		} else {
			res.status(404).send({
				success: false,
				message: 'Not found.',
				data: null
			});
		}
	}
};

// create a listing
exports.createListing = function(req, res) {
	try {
		const user = AuthenticationService.getUserFromRequest(req);
		let listing = req.body || {};
		listing = ListingsService.createListing(user, listing);
		res.send({
			success: true,
			message: null,
			data: {
				listing: listing
			}
		});
	} catch (err) {
		if (err.message === 'INVALID_PRICE') {
			res.status(400).send({
				success: false,
				message: 'The price must be greater than 0.',
				data: null
			});
		} else {
			res.status(400).send({
				success: false,
				message: 'Invalid parameters.',
				data: null
			});
		}
	}
};