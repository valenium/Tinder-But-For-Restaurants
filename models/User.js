const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema(
	{
		like: { type: String,  enum: ['Like', 'Save', 'Dislike']},
		restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
	},
	{ timestamps: true }
)


const userSchema = new Schema(
	{
		name: { type: String },
		googleId: {
			type: String,
			required: true
		},
		email: String,
		avatar: String,
		username: { type: String, unique: true },
		zipCode: { type: Number, 
			// default: 10016, 
			// required: true 
		},
		city: {
			type: String,
			// enum ?
		}, // deprecate
		latitude: { type: Number }, // deprecate
		longitude: { type: Number }, // deprecate
		distance: { type: Number, max: 24.8548477, default: 24.8548477, required: true }, // deprecate
		likes: [likeSchema],
		price: {type: String},
		category: {type: String}, // deprecate
		categories: [{type: String}],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
