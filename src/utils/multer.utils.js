const multer = require("multer");
const path = require("path");

// Multer config
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".pdf") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

module.exports = upload.fields(
  [
    {name: 'image', maxCount: 1}, 
    {name: 'bookThumbnail', maxCount: 1}, 
    {name: 'bookFile', maxCount: 1}

  ])