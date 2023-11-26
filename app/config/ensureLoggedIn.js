module.exports = {
    isAuthenticated,
    isAuthorized
}


function isAuthenticated(req,res,next){
    if (req.isAuthenticated()) return next()
    res.redirect('/auth/google')
}

function isAuthorized(req,res,next){
    const requestedUserId = req.params.id
    if (req.user && req.user.id === requestedUserId){
        return next()
        console.log('user is authorized to view page')
    }else{
        res.status(403).send('Forbidden')
        console.log('user is not authorized')
    } 
}