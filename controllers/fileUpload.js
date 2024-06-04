const File= require('../models/Files')
const cloudinary= require('cloudinary').v2

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

async function uploadFileCloudinary(file, folder, quality){
    const options={folder}
    options.resource_type = "auto"
    if(quality){
        options.quality= quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options)

}
//upload images
exports.imageUpload= async(req, res)=>{
    try{
        const {name, tags,email}= req.body
        console.log(name, tags, email)

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
        
        const response= await uploadFileCloudinary(file, "project")
        console.log(response)

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })



        res.json({
            success: true,
            message:'Image uploaded successfully',
            file: fileData
        })

    }catch(e){
        console.error(e)
        res.status(400).json({
            success: false,
            message:'Error while uploading the image'
        })

    }
}

exports.videoUpload= async(req, res)=>{
    try{
        const {name, tags,email}= req.body
        console.log(name, tags, email)

        const file= req.files.videoFile
        console.log(file)

        const supportedTypes=["mp4", "mov"]
        const fileType=file.name.split('.')[1].toLowerCase()
        if(!isSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "file not supported"
            })
        }

        const response= await uploadFileCloudinary(file, "project")
        console.log(response)

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })



        res.json({
            success: true,
            message:'Video uploaded successfully',
            file: fileData
        })



    }catch(e){
        console.log(e)
        console.error(e)
        res.status(400).json({
            success: false,
            message: 'Error during uploading the video'
        })
    }
}

exports.imageSizeReducer= async (req, res)=>{
    try{
        //fetch
        const {name, tags,email}= req.body
        console.log(name, tags, email)
        
        //file
        const file= req.files.imageFile
        console.log(file)

        //validate
        const supportedTypes=["jpg", "jpeg", "png"]
        const fileType=file.name.split('.')[1].toLowerCase()
        if(!isSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "file not supported"
            })
        }
        
        //upload
        const response= await uploadFileCloudinary(file, "project", 30)
        console.log(response)

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })
        res.json({
            success: true,
            message:'Image uploaded successfully',
            file: fileData
        })
    }catch(e){
        console.log(e)
        console.error(e)
        res.status(400).json({
            success: false,
            message: 'Error during uploading the image'
        })
    }
}