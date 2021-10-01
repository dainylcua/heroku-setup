//////
// Dependencies
////
// Initializes node modules
const express = require('express')
const methOv = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection

///////
// Port
////
// Allows the use of of Heroku's or your own local port
const PORT = process.env.PORT || 3000

///////
// Database
////
// Connects to database - either using Heroku or local connection
const DATABASE_URL = process.env.DATABASE_URL

// Connect to Mongo
mongoose.connect(DATABASE_URL)

// Troubleshooting
db.on('error', (err) => console.log(err.message + ' check connection to MongoDB'))
db.on('connected', () => console.log(`MongoDB connected at ${db.port}`))
db.on('disconnected', () => console.log('Disconnected from MongoDB'))

///////
// Middleware
////
// Mounts middleware to app
app.use(express())
app.use(express.static('public'))                   // Allows public folder usage
app.use(express.json())                             // Allows express to read JSON
app.use(express.urlencoded({ extended: false }))    // Allows express to read encoded form data
app.use(methOv('_method'))                          // Allows POST, PUT, and DELETE methods to be used in forms

///////
// Routes
////
// Allows paths to be reached, remember INDUCES

// Index route
app.get('/', (req, res) => {
    res.send('Hello World!')
})




///////
// Listener
////
// Listens to connection
app.listen(PORT, () => console.log(`Express is listening on port ${PORT}`))
