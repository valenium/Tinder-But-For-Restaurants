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
  // const currentUser = await User.findById(req.params.id)
  console.log(req.user)
  if (req.user.isFirstLogin) {
    res.redirect(`/users/${req.user._id}/new`)
    console.log('logging new user in')
  } else {
    res.redirect('/restaurants/filter')
    console.log('logging returning user in')
  }
  // if (req.user.city != null) {
  //   res.redirect('/restaurants/filter')
  //   console.log('logging returning user in')
  // } else {
  //   res.redirect(`/users/${req.user._id}/new`)
  //   console.log('logging new user in')
  // }
})

// OAuth logout route
router.get('/logout', function(req,res){
  req.logout(function(){
    res.redirect('/')
    console.log('logging out user')
  })
})

// Delete Google OAuth credential
// router.delete('/users/:id/credentials_google', async function(req,res){
//   const user = await User.findById(req.params.id)
//   try {
//     User.update(
//       { google_id: null, google_token: null },
//       { where: { _id: user } }
//     )
//     console.log('deleting google oauth credential')
//   } catch(err) {
//     console.log(err)
//     console.log('could not delete google oauth creds')
//   }
// })

module.exports = router;