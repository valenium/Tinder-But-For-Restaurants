const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users')

// GET new user page
router.get('/new', userCtrl.new)

//POST create new user
router.post('/', userCtrl.create)

//Get user profile

router.get('/', userCtrl.index)
router.get('/:id', userCtrl.show)

//PUT update profile
router.put('/:id', userCtrl.update)

//DELETE delete user
router.delete('/:d', userCtrl.delete)

//GET edit profile
router.get('/:id/edit', userCtrl.edit)

module.exports = router;
