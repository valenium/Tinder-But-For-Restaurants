const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema(
	{
		like: { type: String, enum: ['Like', 'Save', 'Dislike'] },
		restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
	},
	{ timestamps: true }
)

const userSchema = new Schema(
	{
		name: { type: String },
		googleId: {
			type: String,
			required: true,
		},
		email: String,
		avatar: String,
		username: { type: String, unique: true },
		zipCode: {
			type: Number,
		},
		distance: {
			type: Number,
			max: 24.8548477,
			default: 24.8548477,
			required: true,
		},
		likes: [likeSchema],
		price: { type: Number },
		categories: [{ type: String }],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
