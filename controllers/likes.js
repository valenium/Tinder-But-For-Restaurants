const User = require('../models/User')
const Restaurant = require('../models/Restaurant')

module.exports = {
	show,
	create,
	delete: deleteLike,
	edit,
}

async function show(req, res) {
	const user = await User.findById(req.params.id).populate({
		path: 'likes',
		populate: { path: 'restaurant' },
	})
	try {
		res.render(`users/likes`, {
			title: `Restaurants You've Liked`,
			errorMsg: '',
			user,
		})
	} catch (err) {
		console.log(err)
	}
}

async function create(req, res) {
	const user = await User.findById(req.user.id)
	const restaurant = await Restaurant.findById(req.params.id)

	await user.likes.push({ like: 'Like', restaurant: restaurant })
	try {
		await user.save()
		res.redirect(`/restaurants/find`)
	} catch (err) {
		console.log(err)
	}
}

async function deleteLike(req, res) {
	const likeId = req.body.id
	try {
		await User.updateOne(
			{ _id: req.params.id },
			{ $pull: { likes: { _id: likeId } } }
		)
		res.redirect(`/users/${req.user._id}/likes/edit`)
	} catch (err) {
		console.log(err)
	}
}

async function edit(req, res) {
	const user = await User.findById(req.params.id).populate({
		path: 'likes',
		populate: { path: 'restaurant' },
	})
	try {
		res.render(`users/edit-likes`, {
			title: `Edit Restaurants You've Liked`,
			errorMsg: '',
			user,
		})
	} catch (err) {
		console.log(err)
	}
}
