require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const cookie_parser = require('cookie-parser')

const auth_router = require('./routers/auth.js')
const livepeer_router = require('./routers/livepeer.js')

const app = express()

app.use(helmet())
app.use(cookie_parser())
app.use(express.json())

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.owtwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)


app.use('/auth', auth_router)
app.use('/stream', livepeer_router)
  
app.get('/', async (req, res) => {
  res.send('Hello World!')
})


  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })

  //create stream object
  //add calls to livepeer api 
