const fs = require('fs');
const LISTING_FILE = 'db/listings.json';

// get all listings
exports.index = function() {
	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));
	return listings;
};

// get a listing
exports.getListing = function(id) {
	if (id === -1) {
		throw new Error('INVALID_PARAMETERS');
	}

	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));
	const listing = listings.find(function(element) {
		return (element.id === id);
	});

	if (!listing) {
		throw new Error('NOT_FOUND');
	}

	return listing;
};

// delete a listing
exports.deleteListing = function(user, id) {
	if (id === -1) {
		throw new Error('INVALID_PARAMETERS');
	}

	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));

	let index = -1;

	for (let i = 0; i < listings.length; i++) {
		const listing = listings[i];
		if (listing.id === id) {
			index = i;
			break;
		}
	}

	if (index === -1) {
		throw new Error('NOT_FOUND');
	}

	if (listings[index].userId !== user.id) {
		throw new Error('FORBIDDEN');
	}

	listings.splice(index, 1);
	fs.writeFileSync(LISTING_FILE, JSON.stringify(listings));
	return listings;
};

// update a listing
exports.updateListing = function(user, id, requestBody) {
	if (id === -1 || !requestBody.title || !requestBody.description || !requestBody.email || !requestBody.phoneNumber) {
		throw new Error('INVALID_PARAMETERS');
	}

	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));

	let index = -1;

	for (let i = 0; i < listings.length; i++) {
		const listing = listings[i];
		if (listing.id === id) {
			index = i;
			break;
		}
	}

	if (index === -1) {
		throw new Error('NOT_FOUND');
	}

	if (listings[index].userId !== user.id) {
		throw new Error('FORBIDDEN');
	}

	listings[index].title = requestBody.title;
	listings[index].description = requestBody.description;
	listings[index].email = requestBody.email;
	listings[index].phoneNumber = requestBody.phoneNumber;
	fs.writeFileSync(LISTING_FILE, JSON.stringify(listings));

	return listings[index];
};

// create a listing
exports.createListing = function(user, listing) {
	if (!listing.title || !listing.description || !listing.email || !listing.phoneNumber) {
		throw new Error('INVALID_PARAMETERS');
	}

	const listings = JSON.parse(fs.readFileSync(LISTING_FILE));

	let newId = 0;
	if (listings.length > 0) {
		newId = listings[listings.length - 1].id + 1
	}

	listing.id = newId;
	listing.userId = user.id;
	listings.push(listing);

	fs.writeFileSync(LISTING_FILE, JSON.stringify(listings));
	return listings;
};