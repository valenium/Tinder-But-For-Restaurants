const express = require('express');
const router = express.Router();
const restaurantsCtrl = require ('../controllers/restaurants')
const ensureLoggedIn = require('../config/ensureLoggedIn')

/* GET users listing. */
router.get('/restaurants/filter', ensureLoggedIn.isAuthenticated, restaurantsCtrl.filter);
router.post('/restaurants/find', ensureLoggedIn.isAuthenticated, restaurantsCtrl.find);
router.get('/restaurants/:id', ensureLoggedIn.isAuthenticated, restaurantsCtrl.show);


module.exports = router;