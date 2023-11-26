const User = require('../models/User')

module.exports = {
    show,
    create,
}


async function show(req,res) {
    const user = await User.findById(req.params.id)
    try{
        res.render(`users/dislikes`,{
        title: `Restaurants You've Disliked`,
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