const mongoose = require('mongoose')

const friendschema = mongoose.Schema({
    
    user:{
        
       type: mongoose.Types.ObjectId,
       required:true
    
    },

    following:[mongoose.Types.ObjectId],

    followers:[mongoose.Types.ObjectId]

})


module.exports = mongoose.model('friend',friendschema)