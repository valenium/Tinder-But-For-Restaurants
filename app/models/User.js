const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema(
	{
		like: { type: String,  enum: ['Like', 'Save', 'Dislike']},
		restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
		comment: { type: String },
		rating: {
			type: Number,
			min: 1,
			max: 5,
			default: 5
		}
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
		zipCode: { type: Number, default: 10016, required: true },
		city: {
			type: String,
			// enum ?
		},
		latitude: { type: Number },
		longitude: { type: Number },
		distance: { type: Number, max: 24.8548477, default: 24.8548477, required: true },
		likes: [likeSchema],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
