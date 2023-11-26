const json = require('./sample-business-10016.json')
const Restaurant = require('../models/Restaurant')
require('dotenv').config()
require('../config/database')

const businesses = JSON.parse(JSON.stringify(json.businesses))

async function setRestaurants () {
    await Restaurant.deleteMany().then(results => console.log(results))
    await Restaurant.create(businesses)
    await Restaurant.find().then(results => console.log(results))
}

setRestaurants()