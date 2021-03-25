const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const cakeRoutes = require('./routes/cake.routes')
// const mongodb = require('./mongodb/mongodb.connect')
// const Datastore = require('nedb')
// const db = new Datastore('./collections/cakes.db')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))
//mongodb.connect()

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message })
})

app.use('/cake', cakeRoutes)

app.get('/', (req, res) => {
  res.json('App Server')
})

app.listen(8000, () => {
  console.log('Server is now running!')
})
