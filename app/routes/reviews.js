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

const likesCtrl = require('../controllers/likes')
const savedCtrl = require('../controllers/saves')
const dislikesCtrl = require('../controllers/dislikes')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//GET user likes page
router.get('/users/:id/likes', ensureLoggedIn, likesCtrl.show)

//POST add to like array
router.post('/users/:id/likes', ensureLoggedIn, likesCtrl.create)

//GET user saved page
router.get('/users/:id/saved', savedCtrl.show)

//POST add to saved array
router.post('/users/:id/saved', savedCtrl.create)

//GET user dislikes page
router.get('/users/:id/dislikes', dislikesCtrl.show)

//POST add to dislike array
router.post('/users/:id/dislikes', dislikesCtrl.create)

module.exports = router;