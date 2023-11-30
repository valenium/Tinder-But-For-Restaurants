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
		if (response.status === 400) {
			throw new Error(
				`${response.statusText} - please <a href="/users/${req.user._id}/edit">verify your <strong>zip code</strong></a> and try again.`
			)
		}
		if (response.status !== 200) {
			throw new Error(`${response.statusText}`)
		} else {
			nearbyRestaurants = await response.json()

			let categorySet = new Set(
				nearbyRestaurants.businesses
					.map((restaurant) =>
						restaurant.categories.map((category) => category.title)
					)
					.flat()
					.sort
					// 	(a, b) => {
					// 	if (a > b) {
					// 		return 1
					// 	}
					// 	if (b > a) {
					// 		return -1
					// 	}
					// 	return 0
					// }
					()
			)

			nearbyRestaurants.businesses.forEach(async (business) => {
				await Restaurant.findOneAndReplace({ id: business.id }, business, {
					upsert: true,
				})
			})

			res.render('restaurants/filter', {
				title: 'Restaurant Filters',
				categories: categorySet,
				messageHTML: ``,
			})
		}
	} catch (err) {
		console.error(err)
		res.render('restaurants/filter', {
			title: 'Restaurant Filters',
			categories: [],
			messageHTML: `<div class="message-danger">${err}</div>`,
		})
	}
}

async function find(req, res) {
	const queryObj = {}
	queryObj['_id'] = { $nin: req.user.likes.map((obj) => obj.restaurant) }
	queryObj['location.zip_code'] = {
		$gt: req.user.zipCode - 1500,
		$lt: req.user.zipCode + 1500,
	}
	if (req.user.price) {
		let priceArray = ['', '$', '$$', '$$$', '$$$$']
		priceArray.slice(0, req.user.price)
		queryObj['price'] = { $in: priceArray }
	}
	if (req.user.categories) {
		queryObj['categories.title'] = { $in: req.user.categories }
	}
	try {
		const restaurant = await Restaurant.findOne(queryObj)
		if (!restaurant) {
			throw new Error()
		} else {
			res.redirect(`/restaurants/${restaurant._id}`)
		}
	} catch (err) {
		console.error(err)
		res.render('restaurants/error')
	}
}
