const User = require('../models/User')

module.exports = {
    new: newUser,
    create,
    index,
    show,
    edit,
    update,
    delete: deleteUser
}

function newUser(req,res) {
    res.render('users/new', {
        title: 'New User',
        errorMsg: ''
    })
}

async function create(req,res) {
    try{
        await User.create(req.body)
        res.redirect('/users')
    }catch(err){
        console.log(err)
    }
}

async function index(req,res) {
    const userDetail = await User.find()
    try{
        res.render('users', {
            users: userDetail,
            title: 'User Info',
            errorMsg: ''
        })
    }catch(err){
        console.log(err)
    }
}

async function show(req,res) {
    const userDetail = await User.findById(req.params.id)
    try {
        res.render('users/show', {
            user: userDetail,
            title: 'User Profile',
            errorMsg: ''
        })
    }catch(err){
        console.log(err)
    }
}

async function edit(req,res) {
    const user = await User.findById(req.params.id)
    res.render('users/edit', {
        user,
        title: 'Edit User',
        errorMsg: ''
    })
}

async function update(req,res) {
    try{
        await User.findById(req.params.id)
        await User.findOne(req.body)
        await User.updateOne({_id: req.params.id}, {$set: req.body})
        res.redirect(`/users/${req.params.id}`)
    }catch(err){
        console.log(err)
    }
}

async function deleteUser(req,res) {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.redirect('/users')
    }catch(err){
        console.log(err)
    }
}