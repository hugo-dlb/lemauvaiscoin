const fs = require('fs');
const LISTING_FILE = 'src/db/listings.json';

// get all listings
exports.index = function(req, res) {
	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));
	res.send(listings);
};

// get a listing
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

// delete a listing
exports.deleteListing = function(req, res) {
	const id = Number.parseInt(req.params.id);
	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));

	let index = -1;

	for (let i = 0; i < listings.length; i++) {
		const listing = listings[i];
		if (listing.id === id) {
			index = i;
			break;
		}
	}

	if (index !== -1) {
		listings.splice(index, 1);
		fs.writeFileSync(LISTING_FILE, JSON.stringify(listings));
		res.send(listings);
	} else {
		res.status(404).send('Not found');
	}
};

// update a listing
exports.updateListing = function(req, res) {
	const id = Number.parseInt(req.params.id);
	const newListing = req.body || {};
	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));

	let index = -1;

	for (let i = 0; i < listings.length; i++) {
		const listing = listings[i];
		if (listing.id === id) {
			index = i;
			break;
		}
	}

	if (index !== -1) {
		listings[index].title = newListing.title || '';
		listings[index].description = newListing.description || '';
		listings[index].email = newListing.email || '';
		listings[index].phoneNumber = newListing.phoneNumber || '';
		fs.writeFileSync(LISTING_FILE, JSON.stringify(listings));
		res.send(listings);
	} else {
		res.status(404).send('Not found');
	}
};

// create a listing
exports.createListing = function(req, res) {
	const newListing = req.body || {};
	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));

	let newId = 0;
	if (listings.length > 0) {
		newId = listings[listings.length - 1].id + 1
	}

	const listing = {
		id: newId,
		userId: -1, // todo
		title: newListing.title || '',
		description: newListing.description || '',
		email: newListing.email || '',
		phoneNumber: newListing.phoneNumber || ''
	};
	listings.push(listing);
	fs.writeFileSync(LISTING_FILE, JSON.stringify(listings));
	res.send(listings);
};