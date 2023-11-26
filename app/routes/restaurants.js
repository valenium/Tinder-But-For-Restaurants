const express = require('express');
const router = express.Router();
const restaurantsCtrl = require ('../controllers/restaurants')
const ensureLoggedIn = require('../config/ensureLoggedIn')

/* GET users listing. */
router.get('/restaurants/filter', ensureLoggedIn, restaurantsCtrl.filter);
router.post('/restaurants/find', ensureLoggedIn, restaurantsCtrl.find);
router.get('/restaurants/:id', ensureLoggedIn, restaurantsCtrl.show);


module.exports = router;