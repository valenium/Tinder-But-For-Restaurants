const Restaurant = require('../models/Restaurant')
const User = require('../models/User')

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
	const restaurants = categories.filter((category) =>
		category.parent_aliases.find((alias) => alias === 'restaurants')
	)
	// do i even need all the categories? why not just fetch businesses data, then build an array of categories based on whatever is in the response data refactor me later

	res.render('restaurants/filter', {
		title: 'Restaurant Filters',
		categories: restaurants,
	})
}
async function find(req, res) {
    console.log(req.body)
    for(const property in req.body) {
        if(!req.body[property]) {
            delete req.body[property]
        }
    }
	// const user = await User.findById().then((result) => console.log(result))
    try {
        const restaurants = await Restaurant.findOne({
            // some triangulation of user location, distance, restaurant location
            price: req.body.price,
        })
        res.redirect(`/restaurants/${restaurant._id}`)
    } catch (err) {
        res.send(err)
    }
}
