const mongoose = require('mongoose')

notificationSchema = new mongoose.Schema({
   
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    
    notification:[
        {
            type:String,
            friendId:{
                type:mongoose.Types.ObjectId,
                required:true                
            },
            date:{
                type:Date,
                default:new Date()
            }
        }
    ]

})