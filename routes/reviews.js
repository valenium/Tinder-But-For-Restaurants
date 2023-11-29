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

// DELETE likes
router.delete('/users/:id/likes', ensureLoggedIn.isAuthenticated, likesCtrl.delete)

// GET edit likes page
router.get('/users/:id/likes/edit', ensureLoggedIn.isAuthenticated, likesCtrl.edit)


// SAVED
//GET user saved page
router.get('/users/:id/saved', ensureLoggedIn.isAuthenticated, ensureLoggedIn.isAuthorized, savedCtrl.show)

//POST add to saved array
router.post('/users/:id/saved', ensureLoggedIn.isAuthenticated, savedCtrl.create)

// DELETE saves
router.delete('/users/:id/saved', ensureLoggedIn.isAuthenticated, savedCtrl.delete)

// GET edit save page
router.get('/users/:id/saved/edit', ensureLoggedIn.isAuthenticated, savedCtrl.edit)


// DISLIKES
//GET user dislikes page
router.get('/users/:id/dislikes', ensureLoggedIn.isAuthenticated, ensureLoggedIn.isAuthorized, dislikesCtrl.show)

//POST add to dislike array
router.post('/users/:id/dislikes', ensureLoggedIn.isAuthenticated, dislikesCtrl.create)

// DELETE dislikes
router.delete('/users/:id/dislikes', ensureLoggedIn.isAuthenticated, dislikesCtrl.delete)

// GET edit dislikes page
router.get('/users/:id/dislikes/edit', ensureLoggedIn.isAuthenticated, dislikesCtrl.edit)

module.exports = router;