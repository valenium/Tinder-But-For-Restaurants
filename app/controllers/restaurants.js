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
	const url = `https://api.yelp.com/v3/businesses/search?location=${req.user.zipCode}&radius=40000&sort_by=best_match&limit=50`
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
			const yelpData = await response.json()
			const { id, name, image_url, url, categories, price, location, phone } = yelpData.businesses
			// filter to only insert
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
	} catch (err) {
		console.error('Yelp API Error: ', err)
		res.send(err)
	}
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
