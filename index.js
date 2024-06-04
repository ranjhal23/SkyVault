//create server
const express= require('express')
const app= express()

//PORT
require('dotenv').config()
const PORT= process.env.PORT||4000

//middleware
app.use(express.json())
const fileupload= require('express-fileupload')
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

//connect db
const db= require('./config/database')
const { connect } = require('mongoose')
db.connect()

//cloud connect
const cloudinary= require('./config/cloudinary')
cloudinary.cloudinaryConnect()

//routes
const Upload= require('./routes/FilleUpload')
app.use('/api/v1/upload', Upload)

//activate server
app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
})

