const express = require('express')
const cors = require('cors')
const cakeRoutes = require('./routes/cake.routes')
const photoRoutes = require('./routes/photo.routes')

const app = express()
app.use(cors())
app.use(express.json())
app.set('env', 'production')

app.use('/cake', cakeRoutes)
app.use('/photo', photoRoutes)

app.listen(8000, () => {
  console.log('Server is now running!')
})
