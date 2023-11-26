const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn')
const ensureCorrectUser = require('../config/ensureCorrectUser')

const userCtrl = require('../controllers/users')

// GET new user page
router.get('/new', ensureLoggedIn, userCtrl.new)

//POST create new user
router.post('/', ensureLoggedIn, userCtrl.create)

//Get user profile
router.get('/', ensureLoggedIn, userCtrl.index)
router.get('/:id', ensureCorrectUser, userCtrl.show)

//PUT update profile
router.put('/:id', ensureLoggedIn, userCtrl.update)

//DELETE delete user
router.delete('/:id', ensureLoggedIn, userCtrl.delete)

// GET new user page
router.get('/:id/new', ensureLoggedIn, userCtrl.new)

//GET edit profile
router.get('/:id/edit', ensureLoggedIn, userCtrl.edit)

module.exports = router;
