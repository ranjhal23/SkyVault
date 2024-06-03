const File= require('../models/Files')

exports.localFileUpload= async(req, res)=>{
    try{
        const file= req.files.file
        console.log("file:", file)
        let path= __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`
        console.log('path: '+ path)
        file.mv(path, (e)=>{
            console.log(e)
        })
        res.json({
            success: true,
            message: "local file loaded successfully"
        })

    }
    catch(e){
        console.log('Not able to upload')
        console.log(e)

    }
}
function isSupported(type, supportedTypes){
    return supportedTypes.includes(type)
}
//upload images
exports.imageUpload= async(req, res)=>{
    try{
        const {name, tag,email}= req.body
        console.log(name, tag, email)

        const file= req.files.imageFile
        console.log(file)

        const supportedTypes=["jpg", "jpeg", "png"]
        const fileType=file.name.split('.')[1].toLowerCase()
        if(!isSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "file not supported"
            })
        }

    }catch(e){

    }
}