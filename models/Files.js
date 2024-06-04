const mongoose= require('mongoose')
const nodemailer= require('nodemailer')

const fileSchema= new mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    imageUrl:{
        type:String,
        
    },
    tags:{
        type: String
    },
    email:{
        type:String
    }

})

//middleware
fileSchema.post('save', async function(doc){
    try{
        console.log('DOC', doc)
        //transporter
        let transporter= nodemailer.transporter({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        })

        //send mail
        let info= await transporter.sendMail({
            from: 'From Ranjhal',
            to: doc.email,
            subject: "New File Uploaded to Cloudinary",
            html: `<h2>File Uploaded</h2> <br> view now - <a href="${doc.fileUrl}">CLick Here</a>`
        })

    }catch(e){
        console.error(e)

    }
})


const File=mongoose.model("File", fileSchema)
module.exports= File