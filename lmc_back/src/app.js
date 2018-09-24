const express = require('express');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// serve front-end application
app.use('/', serveStatic(path.join(__dirname, '../..', 'lmc_front/dist')));

// import controllers
const listingsController = require('./controllers/listings-controller');

// initialize the router
const router = express.Router();

/// LISTINGS ROUTES ///
router.get('/listings', listingsController.index);
router.get('/listings/:id', listingsController.getListing);
router.delete('/listings/:id', listingsController.deleteListing);
router.post('/listings/:id', listingsController.updateListing);
router.put('/listings', listingsController.createListing);

/// USERS ROUTES /// todo

app.use('/api', router);

app.listen(3000, function () {
	console.log('lmc REST API listening on port 3000!')
});
