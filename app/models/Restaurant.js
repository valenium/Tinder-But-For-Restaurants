const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coordinateSchema = new Schema(
	{
		longitude: { type: Number },
		latitude: { type: Number },
	},
	{ timestamps: true }
)
const locationSchema = new Schema(
	{
		city: { type: String },
		zip_code: { type: Number },
	},
	{ timestamps: true }
)

const reviewSchema = new Schema(
	{
		comment: { type: String },
		rating: {
			type: Number,
			min: 1,
			max: 5,
			default: 5
		}
	},
	{ timestamps: true 
	}
)

const restaurantSchema = new Schema(
	{
        id: { type: String },
		name: { type: String },
        image_url: { type: String },
        url: { type: String },
		categories: [{ alias: String, title: String }],
		coordinates: coordinateSchema,
		price: { type: String, enum: ['$', '$$', '$$$', '$$$$'] },
		location: locationSchema,
        phone: { type: String },
        distance: { type: Number },
		reviews: [reviewSchema]
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Restaurant', restaurantSchema)
