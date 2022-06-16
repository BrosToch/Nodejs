const multer = require('multer')

const formRequest = () => {
    return (multer().array())
}

const uploadFile = (filePath) => {
    let storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null, filePath)
        },
        filename: function(req,file,cb){
            cb(null,file.fieldname+"_"+Date.now()+ "_"+file.originalname);
        }
    })
    return (multer({storage: storage}).single('image'))
}

module.exports = {
    formRequest,
    uploadFile
}