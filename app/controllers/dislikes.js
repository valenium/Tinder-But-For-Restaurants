const User = require('../models/User')
const Restaurant = require('../models/Restaurant')

module.exports = {
    show,
    create,
}

async function show(req,res) {
    const user = await User.findById(req.params.id).populate({path:'likes', populate: {path: 'restaurant'}})
    try{
        res.render(`users/dislikes`,{
        title: `Restaurants You've Disliked`,
        errorMsg: '',
        user
    })
}
    catch(err){
        console.log(err)
    }
}

async function create(req,res) {
    const user = await User.findById(req.user.id)
    const restaurant = await Restaurant.findById(req.params.id)
    console.log(req.params)
    console.log(user)
    console.log(restaurant)
    await user.likes.push({like: 'Dislike', restaurant: restaurant})
    try {
        await user.save()
    } catch(err){
        console.log(err)
    }
}