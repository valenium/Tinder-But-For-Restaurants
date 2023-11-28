const User = require('../models/User')

module.exports = {
	new: newUser,
	// create,
	// index,
	show,
	edit,
	update,
	delete: deleteUser,
	updateFilter,
}

async function newUser(req, res) {
	const user = await User.findById(req.params.id)
	try {
		res.render('users/edit', {
			title: 'New User',
			errorMsg: '',
			user,
		})
	} catch (err) {
		console.log(err)
	}
}

async function create(req, res) {
	try {
		await User.create(req.body)
		res.redirect('/users')
	} catch (err) {
		console.log(err)
	}
}

// async function index(req, res) {
// 	const userDetail = await User.find()
// 	try {
// 		res.render('users/index', {
// 			users: userDetail,
// 			title: 'User Info',
// 			errorMsg: '',
// 		})
// 	} catch (err) {
// 		console.log(err)
// 	}
// }

async function show(req, res) {
	const userDetail = await User.findById(req.params.id)
	try {
		res.render('users/show', {
			user: userDetail,
			title: 'User Profile',
			errorMsg: '',
		})
	} catch (err) {
		console.log(err)
	}
}

async function edit(req, res) {
	const user = await User.findById(req.params.id)
	res.render('users/edit', {
		user,
		title: 'Edit User',
		errorMsg: '',
	})
}

async function update(req, res) {
	try {
		await User.findById(req.params.id)
		await User.findOne(req.body)
		await User.updateOne({ _id: req.params.id }, { $set: req.body })
		res.redirect(`/users/${req.params.id}`)
	} catch (err) {
		console.log(err)
	}
}

async function deleteUser(req, res) {
	try {
		await User.findByIdAndDelete(req.params.id)
		res.redirect('/')
	} catch (err) {
		console.log(err)
	}
}

async function updateFilter(req, res) {
	try {
		console.log(req.body)
		if (!req.body.price) {
			req.body.price = null
		}
		await User.findByIdAndUpdate(req.user._id, { $set: req.body })
		res.redirect('/restaurants/find')
	} catch (err) {
		console.error(err)
	}
}
