const express = require('express');
const cors = require('cors');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// enable CORS for all requests
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// serve front-end application
app.use('/', serveStatic(path.join(__dirname, '../..', 'lmc_front/dist')));

// import controllers
const listingsController = require('./controllers/listings-controller');
const authController = require('./controllers/authentication-controller');

// import middlewares
const loggedInMiddleware = require('./middlewares/logged-in-middleware').loggedInMiddleware;

// initialize the router
const router = express.Router();

/// LISTINGS ROUTES ///
router.get('/listings', listingsController.index);
router.get('/listings/:id', listingsController.getListing);
router.delete('/listings/:id', loggedInMiddleware, listingsController.deleteListing);
router.post('/listings/:id', loggedInMiddleware, listingsController.updateListing);
router.put('/listings', loggedInMiddleware, listingsController.createListing);
router.get('/userListings', loggedInMiddleware, listingsController.getUserListings);

/// AUTH ROUTES ///
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

app.use('/api', router);

app.listen(3000, function () {
	console.log('lmc REST API listening on port 3000!')
});
