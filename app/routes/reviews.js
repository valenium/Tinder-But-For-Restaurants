const express = require('express');
const router = express.Router();

const likesCtrl = require('../controllers/likes')
const savedCtrl = require('../controllers/saves')
const dislikesCtrl = require('../controllers/dislikes')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//GET user likes page
router.get('/users/:id/likes', likesCtrl.show)

//POST add to like array
router.post('/users/:id/likes', likesCtrl.create)

//GET user saved page
router.get('/users/:id/saved', savedCtrl.show)

//POST add to saved array
router.post('/users/:id/saved', savedCtrl.create)

//GET user dislikes page
router.get('/users/:id/dislikes', dislikesCtrl.show)

//POST add to dislike array
router.post('/users/:id/dislikes', dislikesCtrl.create)

module.exports = router;