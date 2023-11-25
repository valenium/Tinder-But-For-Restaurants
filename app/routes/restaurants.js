const express = require('express');
const router = express.Router();
const restaurantsCtrl = require ('../controllers/restaurants')

/* GET users listing. */
router.get('/restaurants/filter', restaurantsCtrl.filter);
router.get('/restaurants/filter/:category', restaurantsCtrl.find);
router.get('/restaurants/:id', restaurantsCtrl.show);


module.exports = router;