require('dotenv').config()
require('./config/database')

const Restaurant = require('./models/Restaurant')
const User = require('./models/User')
const Review = require('./models/Review')

async function getData(){
    await User.find().then(result => console.log('User', result))
    await Restaurant.find().limit(10).then(result => console.log('Restaurant', result))
    await Review.find().limit(10).then(result => console.log('Review', result))
}

getData()