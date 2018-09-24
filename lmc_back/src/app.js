const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const app = express();

// serve front-end application
app.use('/', serveStatic(path.join(__dirname, '../..', 'lmc_front/dist')));

const listingsController = require('./controllers/listings-controller');
const router = express.Router();

/// LISTINGS ROUTES ///
router.get('/listings', listingsController.index);
router.get('/listings/:id', listingsController.getListing);
router.put('/listings', listingsController.createListing);

app.use('/api', router);

app.listen(3000, function () {
	console.log('lmc REST API listening on port 3000!')
});
