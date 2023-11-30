const Restaurant = require('../models/Restaurant') //Considering changing to Review model to display Yelp reviews as icebox
const User = require('../models/User')
module.exports = {
    show,
    create,
}
async function show(req,res) {
	const restaurant = await Restaurant.findById(req.params.id).populate({
		path: 'reviews',
		populate: { path: 'user' },
    })
    console.log(restaurant)
    try{
        res.render(`restaurants/reviews`, {
            title: restaurant.name,
            restaurant
        })
    }catch(err){
        console.log(err)
    }
}
async function create(req,res) {
	const restaurant = await Restaurant.findById(req.params.id).populate({
		path: 'reviews',
		populate: { path: 'user' },
    })
    // console.log(restaurant)
    // console.log(req.params)
    // console.log(user)
    // console.log(restaurant)
    req.body.user = req.user
    await restaurant.reviews.push(req.body)
    try {
        await restaurant.save()
        
    } catch(err){
        console.log(err)
    }
    res.redirect(`/restaurants/${restaurant._id}/reviews`)
}