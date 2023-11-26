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
	// const json = require('../yelp-categories-20231122.json')
	// const categories = JSON.parse(JSON.stringify(json.categories))
	// const restaurants = categories.filter((category) =>
	// 	category.parent_aliases.find((alias) => alias === 'restaurants')
	// )
	// do i even need all the categories? why not just fetch businesses data, then build an array of categories based on whatever is in the response data refactor me later - DONE

    // fetching yelp businesses (params: location=user.location, radius=user.distance) and adding it to the restaurants array should happen here. replace find below with create and insert the response json
    {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });

    try {
        await fetch()
    } catch (err) {
        console.error('Error: ', err)
    }

	const nearbyRestaurants = await Restaurant.find().select('categories').exec()
	let categorySet = new Set(
		nearbyRestaurants.map((restaurant) => restaurant.categories.map(category => category.title)).flat()
	) // for deduplicating categories
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
	// const user = await User.findById().then((result) => console.log(result))
	try {
		const restaurant = await Restaurant.findOne({
			// some triangulation of user location, distance, restaurant location
			price: req.body.price,
		})
		res.redirect(`/restaurants/${restaurant._id}`)
	} catch (err) {
		res.send(err)
	}
}
