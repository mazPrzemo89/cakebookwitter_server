const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message })
})

app.get('/', (req, res) => {
  res.json('App Server')
})

app.listen(8000, () => {
  console.log('Server is now running!')
})

module.exports = app
