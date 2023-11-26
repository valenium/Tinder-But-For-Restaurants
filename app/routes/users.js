const express = require('express');
const router = express.Router();

const ensureLoggedIn = require('../config/ensureLoggedIn')
const isAuthorized = (req,res,next) => {
    const requestedUserId = req.params.id
    if (req.user && req.user.id === requestedUserId){
        return next()
        console.log('user is authorized to view page')
    }else{
        res.status(403).send('Forbidden')
        console.log('user is not authorized')
    }
}

const userCtrl = require('../controllers/users')

// GET new user page
router.get('/new', ensureLoggedIn, userCtrl.new)

//POST create new user
router.post('/', ensureLoggedIn, userCtrl.create)

//Get user profile
router.get('/', ensureLoggedIn, userCtrl.index)
router.get('/:id', ensureLoggedIn, isAuthorized, userCtrl.show)

//PUT update profile
router.put('/:id', ensureLoggedIn, userCtrl.update)

//DELETE delete user
router.delete('/:id', ensureLoggedIn, userCtrl.delete)

// GET new user page
router.get('/:id/new', ensureLoggedIn, userCtrl.new)

//GET edit profile
router.get('/:id/edit', ensureLoggedIn, userCtrl.edit)

module.exports = router;
