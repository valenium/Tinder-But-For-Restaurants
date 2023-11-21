const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema(
	{
		like: { type: Boolean },
		restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
		comment: { type: String },
	},
	{ timestamps: true }
)

const userSchema = new Schema(
	{
		name: { type: String },
		username: { type: String, unique: true },
		zipCode: { type: Number },
		city: {
			type: String,
			// enum ?
		},
		latitude: { type: Number },
		longitude: { type: Number },
		distance: { type: Number },
		likes: [likeSchema],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
