const express = require('express');
const router = express.Router();
const passport = require('passport')

const User = require('../models/User')

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
async (req,res) => {

  if (req.user.zipCode) {
    res.redirect('/restaurants/filter')
  } else {
    res.redirect(`/users/${req.user._id}/new`)
  }
})

// OAuth logout route
router.get('/logout', function(req,res){
  req.logout(function(){
    res.redirect('/')
  })
})

module.exports = router;