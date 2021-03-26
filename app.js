const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const cakeRoutes = require('./routes/cake.routes')
const photoRoutes = require('./routes/photo.routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('combined'))

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message })
})

app.use('/cake', cakeRoutes)
app.use('/photo', photoRoutes)
app.get('/', (req, res) => {
  res.json('App Server')
})

app.listen(8000, () => {
  console.log('Server is now running!')
})
