const User = require('../models/User')
const Restaurant = require('../models/Restaurant')

module.exports = {
    show,
    create,
}

async function show(req,res) {
    const user = await User.findById(req.params.id)
    try{
        res.render(`users/likes`,{
        title: `Restaurants You've Liked`,
        erroMsg: ''
    })
}
    catch(err){
        console.log(err)
    }
}

async function create(req,res) {
    const user = await User.findById(req.params.id)
    await user.likes.push(req.body)
    try {
        await user.save()
    } catch(err){
        console.log(err)
    }
}