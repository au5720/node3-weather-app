const request = require('request')

const forecast = (lat, lon, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=6edddc0964c48755078abe2e8b958454&query=' + encodeURIComponent(lon) + ',' + encodeURIComponent(lat)

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to Weather Service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const current = body.current
      const weather = `${current.weather_descriptions[0]} .It is currently ${current.temperature} degrees but feels like ${current.feelslike} Degrees out`
      callback(undefined, weather)
    }
  })
}

module.exports = forecast