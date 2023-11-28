const Restaurant = require('../models/Restaurant')
const User = require('../models/User')

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
	const url = `https://api.yelp.com/v3/businesses/search?location=${req.user.zipCode}&radius=40000&sort_by=best_match&limit=30`
	let nearbyRestaurants
	try {
		const response = await fetch(url, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.YELP_API_KEY}`,
			},
		})
		if (response.status !== 200) {
			throw new Error(`HTTP status ${response.status}: `, await response.json())
		} else {
			nearbyRestaurants = await response.json()
		}
	} catch (err) {
		console.error('Yelp API Error', err)
	}

	let categorySet = new Set(
		nearbyRestaurants.businesses
			.map((restaurant) =>
				restaurant.categories.map((category) => category.title)
			)
			.flat()
	)

	nearbyRestaurants.businesses.forEach(async (business) => {
		await Restaurant.findOneAndReplace({ id: business.id }, business, {
			upsert: true,
		})
	})

	res.render('restaurants/filter', {
		title: 'Restaurant Filters',
		categories: categorySet,
	})
}

async function find(req, res) {
	let queryObj = {}
	queryObj['_id'] = { $nin: req.user.likes.map((obj) => obj.restaurant) }
	queryObj['categories.title'] = req.user.category
	queryObj['location.zip_code'] = {
		$gt: req.user.zipCode - 1000,
		$lt: req.user.zipCode + 1000,
	}
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
		console.error(err)
	}
}
