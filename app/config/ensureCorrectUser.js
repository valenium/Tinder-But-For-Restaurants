module.exports = {
    isAuthenticated,
    isAuthorized
}

function isAuthenticated(req,res,next){
    if (req.isAuthenticated()) return next()
    res.redirect('/auth/google')
}

function isAuthorized(req,res,next){
    let requestedUserId = req.params.userId
    if (req.user && req.user.id === requestedUserId) {
        return next()
    }
    res.send('user cannot access')
}