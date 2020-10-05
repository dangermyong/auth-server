const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

// connect to db
mongoose.connect(process.env.DATABASE, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
})
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB CONNECTION ERROR:', err))

// import routes
const authRoutes = require('./routes/auth')

// app middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
// app.use(cors())  // allows all origins
if(process.env.NODE_ENV == 'development') {
  app.use(cors({ origin: process.env.CLIENT_URL }))
}


// middleware
app.use('/api', authRoutes)



app.listen(port, () => {
  console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`)
})

