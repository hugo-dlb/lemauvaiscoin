const fs = require('fs');
const LISTING_FILE = 'src/db/listings.json';

// get all listings
exports.index = function(req, res) {
	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));
	res.send(listings);
};

// get a single listing
exports.getListing = function(req, res) {
	const id = Number.parseInt(req.params.id);
	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));
	const listing = listings.find(function(element) {
		return (element.id === id);
	});

	if (listing) {
		res.send(listing);
	} else {
		res.status(404).send('Not found');
	}
};

// create a listing
exports.createListing = function(req, res) {
	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));
	const listing = {
		id: -1, // todo
		userId: -1, // todo
		title: "Title",
		description: "Description",
		email: "Email",
		phoneNumber: "Phone number"
	};
	listings.push(listing);
	fs.writeFileSync(LISTING_FILE, JSON.stringify(listings));
	res.send(listings);
};