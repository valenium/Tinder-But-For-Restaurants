const mongoose = require('mongoose')
const Schema = mongoose.Schema

const yelpUserSchema = new Schema(
	{
		name: { type: String },
	},
	{ timestamps: true }
)

const reviewSchema = new Schema(
	{
		text: { type: String },
		user: yelpUserSchema,
		rating: { type: Number, enum: [1, 2, 3, 4, 5] },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Review', reviewSchema)