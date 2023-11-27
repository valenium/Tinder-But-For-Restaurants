require('dotenv').config()

const baseUrl = 'https://api.yelp.com/v3'
const reviewsQueries = '?limit=3&sort_by=yelp_sort'

async function getYelpData(url, pathParams, queryParams) {
	try {
		const response = await fetch(url + pathParams + queryParams, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${process.env.YELP_API_KEY}`,
			},
		})
		if (response.status !== 200) {
			console.info(`HTTP status ${response.status}: `, await response.json())
		} else {
			const data = await response.json()
			// console.log(data)
			return data 
		}
	} catch (err) {
		console.error('Yelp API Error: ', err)
	}
}

function convertToMeters(miles) {
	return parseInt(miles * 1609.344)
}

function businessesParams(location, radius) {
	radius = convertToMeters(radius)
	return `?location=${location}&radius=${radius}&sort_by=best_match&limit=20` //
}

module.exports = {
	getBusinesses: function (location, radius) {
		return getYelpData(
			baseUrl,
			'/businesses/search',
			businessesParams(location, radius)
		)
	},
	getReviews: function (businessId) {
		return getYelpData(
			baseUrl,
			`/businesses/${businessId}/reviews`,
			reviewsQueries
		)
	},
	convertToMeters,
}
