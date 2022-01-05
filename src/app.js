const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirectoryFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



// Setup Handlebars Engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryFolder))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Jennifer Morgan'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jennifer Morgan'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Jennifer Morgan',
    message: 'Here to help.'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'Address query must be provided'
    })
  }
  
  const address = req.query.address

  geocode(address, (error, {lat, lon, location} = {}) => {
    if (error) {
      return res.send({error}) 
    }

    forecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.send({error}) 
      }
      return res.send({
        forecast: forecastData,
        location,
        address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/about/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: '404 Help',
    name: 'Jennifer Morgan'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404',
    name: 'Jennifer Morgan'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
