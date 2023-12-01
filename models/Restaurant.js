const mongoose = require('mongoose')
const Schema = mongoose.Schema


const locationSchema = new Schema(
	{
	city: { type: String },
	state: { type: String },
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
			default: 5
		},
		user: {type: Schema.Types.ObjectId, ref: 'User' },
		date: Date,
	},
	{ timestamps: true }
)

const restaurantSchema = new Schema(
	{
		id: { type: String, unique: true },
		name: { type: String },
		image_url: { type: String },
		url: { type: String },
		categories: [{ alias: String, title: String }],
		price: { type: String, enum: ['$', '$$', '$$$', '$$$$'] },
		location: locationSchema,
		phone: { type: String },
		reviews: [reviewSchema],
		rating: { type: Number },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Restaurant', restaurantSchema)
