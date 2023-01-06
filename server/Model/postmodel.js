const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    userid:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },

    post:[{
        images:[String],
        description:String,
        
        reportStatus:{
            type:Boolean,
            default:false
        },
       
        like:[mongoose.Types.ObjectId],

        report:[{
            user:String,
            reason:String
        }],
    
        
        date:{
             type:Date,
             default:new Date()
        }
        
    }],
    

    
}
)

module.exports = mongoose.model('posts',postSchema)
