// const User = require('../models/User') //Considering changing to Review model to display Yelp reviews as icebox

// module.exports = {
//     create,
// }

// async function create(req,res) {
//     const user = await User.findById(req.user.id)
//     const restaurant = await Restaurant.findById(req.params.id)
//     // console.log(req.params)
//     // console.log(user)
//     // console.log(restaurant)
//     await user.likes.push({comment: restaurant})
//     try {
//         await user.save()
        
//     } catch(err){
//         console.log(err)
//     }
// }