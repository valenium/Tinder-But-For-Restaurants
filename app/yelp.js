require('dotenv').config()

module.exports = {
	getBusinesses: function (location, radius) {
		getYelpData(businessesUrl,'', businessesParams(location, radius))
	},
	getReviews: function (businessId) {
		getYelpData(reviewsUrl, businessId, reviewsQueries)
	},
}
const businessesUrl = 'https://api.yelp.com/v3/businesses/search'
const reviewsUrl = 'https://api.yelp.com/v3/businesses/'
const reviewsQueries = '/reviews?limit=20&sort_by=yelp_sort'

function convertToMeters(miles) {
	return miles * 1609.344
}

function businessesParams(location, radius) {
    radius = convertToMeters(radius)
	return `location=${location}&radius=${radius}&sort_by=best_match&limit=50`
}

async function getYelpData(url, pathParams, queryParams) {
	try {
		const response = await fetch(url + pathParams + queryParams, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.YELP_API_KEY}`,
			},
			body: JSON.stringify(data),
		})
		return response.status !== 200
			? console.error(`HTTP ${response.status}: `, response.body)
			: response.json()
	} catch (err) {
		console.error('Yelp API Error: ', err)
	}
}
