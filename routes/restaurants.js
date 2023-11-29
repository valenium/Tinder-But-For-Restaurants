const express = require('express');
const router = express.Router();
const restaurantsCtrl = require ('../controllers/restaurants')
const reviewsCtrl = require('../controllers/reviews')
const ensureLoggedIn = require('../config/ensureLoggedIn')

/* GET users listing. */
router.get('/restaurants/filter', ensureLoggedIn.isAuthenticated, restaurantsCtrl.filter);
router.get('/restaurants/find', ensureLoggedIn.isAuthenticated, restaurantsCtrl.find);
router.get('/restaurants/:id', ensureLoggedIn.isAuthenticated, restaurantsCtrl.show);

//REVIEWS
router.get('/restaurants/:id/reviews', reviewsCtrl.show)
router.post('/restaurants/:id/reviews', reviewsCtrl.create)


module.exports = router;