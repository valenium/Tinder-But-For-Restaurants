const express = require('express');
const router = express.Router();

const ensureLoggedIn = require('../config/ensureLoggedIn')

const userCtrl = require('../controllers/users')

// GET new user page
router.get('/new', ensureLoggedIn.isAuthenticated, userCtrl.new)

//POST create new user
router.post('/', ensureLoggedIn.isAuthenticated, userCtrl.create)

//Get user profile
router.get('/', ensureLoggedIn.isAuthenticated, userCtrl.index)
router.get('/:id', ensureLoggedIn.isAuthenticated, ensureLoggedIn.isAuthorized, userCtrl.show)

//PUT update profile
router.put('/:id', ensureLoggedIn.isAuthenticated, userCtrl.update)

//DELETE delete user
router.delete('/:id', ensureLoggedIn.isAuthenticated, userCtrl.delete)

// GET new user page
router.get('/:id/new', ensureLoggedIn.isAuthenticated, userCtrl.new)

//GET edit profile
router.get('/:id/edit', ensureLoggedIn.isAuthenticated, userCtrl.edit)

module.exports = router;
