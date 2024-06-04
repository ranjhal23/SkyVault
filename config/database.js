const mongoose= require('mongoose')
require('dotenv').config()

exports.connect=()=>{
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log('DB Connection successful'))
    .catch((e)=>{
        console.log('DB error')
        console.error(e)
        process.exit(1)
    })
}