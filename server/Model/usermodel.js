
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{

        type:String,
        required:true

    },

    phone:{
        type:Number,
        required:true
    },

    password:{

        type:String,
        required:true
    },
    
    status:{
        type:Boolean,
        default:false
    },

    career:String,

    bio:String,
    
    profilePicture:String
},

{timestamps:true}
  
)

module.exports = mongoose.model('users',userSchema)