const multer = require('multer')

var fileStorage = multer.diskStorage({ 

    destination: (req, file, cb) => { 
  
      cb(null, '../client/public/images')
  
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '--' + file.originalname)
    }
  })

  module.exports = multer({ storage: fileStorage })