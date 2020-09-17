const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { RSA_NO_PADDING } = require('constants')
const { query, response } = require('express')
const geocode = require('./utils/GeoLocation.js')
const forecast = require('./utils/Forecast.js')

const app = express()
const port = process.env.PORT || 3000

console.log(__dirname)
// Define paths for express config
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPathDirectory))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shraddha Nand Shah'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shraddha Nand Shah'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shraddha Nand Shah'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'address must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, responseData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : responseData,
                location,
                address: req.query.address

            })
        })
    })
    // console.log(req.query.address)
    // res.send({
    //     forecast : 'it is raining',
    //     location : 'singrauli',
    //     address : req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Search must be provided.'
        })
    }
    console.log(req.query.search)
    res.send({
        product: {}
    })
})

app.get('/help/*', (req, res) => {
    res.render('404' , {
        title: '404',
        name: 'Error Message',
        errorMessage: 'Help manual is not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404' , {
        title: '404',
        name: 'Shraddha Nand Shah',
        errorMessage: 'This page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})