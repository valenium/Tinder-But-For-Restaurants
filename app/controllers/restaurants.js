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
	console.log(restaurant)
	res.render('restaurants/show', { title: restaurant.name, restaurant })
}

async function filter(req, res) {
	console.log(req.user)
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
	console.log(req.body)
	for (const property in req.body) {
		if (!req.body[property]) {
			delete req.body[property]
		}
	}
	try {
		const restaurant = await Restaurant.findOne({
			// some triangulation of user location, distance, restaurant location
			price: req.body.price,
			// filter by selected category
			// lets consider massaging the response data so we can turn categories into an array of strings (making it easier to query the titles) instead of array of objects with title and alias properties
			// categories: {$in: {title: req.body.category}}
		})
		if (!restaurant) {
			res.redirect('/restaurants/filter')
		} else {
			res.redirect(`/restaurants/${restaurant._id}`)
		}
	} catch (err) {
		res.send(err)
	}
}
