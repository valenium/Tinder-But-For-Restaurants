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
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }
))

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: false,
    failureRedirect: '/auth/google'
  }
),
(req,res) => {
  if (req.user.isFirstLogin) {
    res.redirect(`/users/${req.user._id}/new`)
    console.log('logging new user in')
  } else {
    res.redirect(`/users/${req.user._id}/edit`)
    console.log('logging returning user in')
  }
})

router.get('/', (req,res) => {
  if (req.isAuthenticated()) {
    console.log('user logged in and can see this page')
    // res.redirect('/')
    // res.redirect(`/users/${req.user._id}/new`)
  } else {
    console.log('user is not authenticated')
    res.redirect('/auth/google')
  }
})

// OAuth logout route
router.get('/logout', function(req,res){
  req.logout(function(){
    res.redirect('/')
    console.log('logging out user')
  })
})

module.exports = router;
