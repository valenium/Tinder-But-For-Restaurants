const Restaurant = require('../models/Restaurant')
const User = require('../models/User')
const yelp = require('../api/yelp')

module.exports = {
	show,
	filter,
	find,
}

async function show(req, res) {
	const restaurant = await Restaurant.findById(req.params.id)
	// console.log(restaurant)
	res.render('restaurants/show', { title: restaurant.name, restaurant })
}

async function filter(req, res) {
	const yelpData = await yelp.getBusinesses(req.user.zipCode, req.user.distance)
	const nearbyRestaurants = await Restaurant.insertMany(yelpData.businesses)

	let categorySet = new Set(
		nearbyRestaurants
			.map((restaurant) =>
				restaurant.categories.map((category) => category.title)
			)
			.flat()
	)
	res.render('restaurants/filter', {
		title: 'Restaurant Filters',
		categories: categorySet,
	})
}
async function find(req, res) {

	let queryObj = {}
	// req.body way - delete me later
	// queryObj['categories.title'] = req.body.category
	// if (req.body.price) {
	// 	queryObj['price'] = req.body.price
	// }

	// new req.user way
	queryObj['categories.title'] = req.user.category
	if (req.user.price) {
		queryObj['price'] = req.user.price
	}
	try {
		const restaurant = await Restaurant.findOne(queryObj)
		if (!restaurant) {
			res.render('restaurants/error')
		} else {
			res.redirect(`/restaurants/${restaurant._id}`)
		}
	} catch (err) {
		res.send(err)
	}
}