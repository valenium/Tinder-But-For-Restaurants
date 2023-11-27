const express = require('express');
const router = express.Router();

const ensureLoggedIn = require('../config/ensureLoggedIn')

const likesCtrl = require('../controllers/likes')
const savedCtrl = require('../controllers/saves')
const dislikesCtrl = require('../controllers/dislikes')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//LIKES
//GET user likes page
router.get('/users/:id/likes', ensureLoggedIn.isAuthenticated, ensureLoggedIn.isAuthorized, likesCtrl.show)

//POST add to like array
router.post('/users/:id/likes', ensureLoggedIn.isAuthenticated, likesCtrl.create)


//SAVED
//GET user saved page
router.get('/users/:id/saved', ensureLoggedIn.isAuthenticated, ensureLoggedIn.isAuthorized, savedCtrl.show)

//POST add to saved array
router.post('/users/:id/saved', ensureLoggedIn.isAuthenticated, savedCtrl.create)


//DISLIKES
//GET user dislikes page
router.get('/users/:id/dislikes', ensureLoggedIn.isAuthenticated, ensureLoggedIn.isAuthorized, dislikesCtrl.show)

//POST add to dislike array
router.post('/users/:id/dislikes', ensureLoggedIn.isAuthenticated, dislikesCtrl.create)

module.exports = router;