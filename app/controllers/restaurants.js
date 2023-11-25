const Restaurant = require('../models/Restaurant')

module.exports = {
	show,
	filter,
	find,
}

async function show(req, res) {
	const restaurant = await Restaurant.findById(req.params.id)
	res.render('restaurants/show', { title: restaurant.name, restaurant })
}
async function filter(req, res) {
	const json = require('../yelp-categories-20231122.json')
	const categories = JSON.parse(JSON.stringify(json.categories))
	const restaurants = categories.filter((category) => category.parent_aliases.find(alias => alias === 'restaurants'))
	res.render('restaurants/filter', { title: 'Restaurant Filters', categories: restaurants })
}
async function find(req, res) {
	const restaurant = '655e88ca91b71b4aa0b160d3'
	res.redirect(`/restaurants/${restaurant}`)
}
