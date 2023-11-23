const express = require('express');
const router = express.Router();
const passport = require('passport') 

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Google OAuth Login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email']
  }
))

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/users/',
    failureRedirect: '/auth/google'
  }
))

router.get('/users', (req,res) => {
  if (req.isAuthenticated()) {
    res.redirect(`${req.user._id}/new`)
  } else {
    res.redirect('/auth/google')
  }
})

// OAuth logout route
router.get('/logout', function(req,res){
  req.logout(function(){
    res.redirect('/')
  })
})

module.exports = router;
