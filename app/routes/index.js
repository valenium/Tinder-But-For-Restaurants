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
    res.redirect('/restaurants/filter')
    console.log('logging returning user in')
  }
})

// OAuth logout route
router.get('/logout', function(req,res){
  req.logout(function(){
    res.redirect('/')
    console.log('logging out user')
  })
})

// Delete Google OAuth credential
// router.delete(`/users/:id/credentials_google`, function(res,res){

// })

module.exports = router;