const express = require('express')
const hbs = require('express-handlebars')
const homeRoute = require('./routes/homeRoute')
const containerRoute = require('./routes/containerRoute')

const server = express()

// Middleware
server.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(express.urlencoded({extended: true}))

server.use('/', homeRoute)
server.use('/container', containerRoute)

module.exports = server