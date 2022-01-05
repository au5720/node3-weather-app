const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamVubmlmZXJtb3JnYW4iLCJhIjoiY2t4eGY5ZXozMXBpMjJ3bzVxdG9mN2twcSJ9.WJJvKxa6CX53_zUA9vfUaQ&limit=1'
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to Geolocation Service', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      const [lat, lon] = body.features[0].center
      const place_name = body.features[0].place_name
      callback(undefined, {
        lon,
        lat,
        location: place_name
      })
    }
  })
}


module.exports = geocode