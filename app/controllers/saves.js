const User = require('../models/User')

module.exports = {
    show,
}

async function show(req,res) {
    const user = await User.findById(req.params.id)
    try{
        res.render(`users/saved`,{
        title: 'Liked Restaurants',
        erroMsg: ''
    })
}
    catch(err){
        console.log(err)
    }
}
