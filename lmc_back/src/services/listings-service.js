const fs = require('fs');
const LISTING_FILE = 'src/db/listings.json';
const USERS_FILE = 'src/db/users.json';

// get all listings
exports.index = function () {
    const listings = JSON.parse(fs.readFileSync(LISTING_FILE));
    return listings;
};

// get a listing
exports.getListing = function (id) {
    if (id === -1) {
        throw new Error('INVALID_PARAMETERS');
    }

    const listings = JSON.parse(fs.readFileSync(LISTING_FILE));
    const listing = listings.find(function (element) {
        return (element.id === id);
    });

    if (!listing) {
        throw new Error('NOT_FOUND');
    }

	const users = JSON.parse(fs.readFileSync(USERS_FILE));
	const user = users.find(function (element) {
		return (element.id === listing.userId);
	});

	if (!user) {
		throw new Error('NOT_FOUND');
	}

	listing.user = user;

    return listing;
};

// get all listings from a user
exports.getUserListings = function (user) {
    const listings = JSON.parse(fs.readFileSync(LISTING_FILE));

    let userListings = [];

    for (let i = 0; i < listings.length; i++) {
        const listing = listings[i];
        if (listing.userId === user.id) {
			userListings.push(listing);
        }
    }

    return userListings;
};

// delete a listing
exports.deleteListing = function (user, id) {
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

	return this.getUserListings(user);
};

// update a listing
exports.updateListing = function (user, id, requestBody) {
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
exports.createListing = function (user, listing) {
    if (!listing.title || !listing.description || (listing.price === undefined)) {
        throw new Error('INVALID_PARAMETERS');
    }

    if (!listing.image) {
    	listing.image = 'http://convert-my-image.com/Content/img/no-image.png';
	}

	listing.price = Number.parseInt(listing.price);
	if (listing.price <= 0) {
		throw new Error('INVALID_PRICE');
	}

    const listings = JSON.parse(fs.readFileSync(LISTING_FILE));

    let newId = 1;
    if (listings.length > 0) {
        newId = listings[listings.length - 1].id + 1
    }

    listing.id = newId;
    listing.userId = user.id;

    listing.createdAt = Date.now();
    listings.push(listing);

    fs.writeFileSync(LISTING_FILE, JSON.stringify(listings));
    return listings;
};
