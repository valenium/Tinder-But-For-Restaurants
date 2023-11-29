const Restaurant = require('../models/Restaurant')
const User = require('../models/User')

module.exports = {
	show,
	filter,
	find,
}

async function show(req, res) {
	const restaurant = await Restaurant.findById(req.params.id)
	res.render('restaurants/show', { title: '', restaurant })
}

async function filter(req, res) {
	const url = `https://api.yelp.com/v3/businesses/search?location=${req.user.zipCode}&radius=40000&sort_by=best_match&limit=50`
	let nearbyRestaurants
	try {
		const response = await fetch(url, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.YELP_API_KEY}`,
			},
		})
		if (response.status !== 200) {
			throw new Error(`HTTP status ${response.status}: ${response.body}`)
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
		.flat().sort((a,b)=> {
			if(a>b) {
				return 1;
			}
			if(b>a) {
				return -1;
			}
			return 0;
		})
		)
console.log(typeof categorySet)
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
	queryObj['location.zip_code'] = {
		$gt: req.user.zipCode - 1000,
		$lt: req.user.zipCode + 1000,
	}
	if (req.user.price) {
		queryObj['price'] = req.user.price
	}
	if (req.user.categories) {
		queryObj['categories.title'] = { $in: req.user.categories }
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
