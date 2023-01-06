const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
      
    postId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    comments:[
        {
            userId:{
              type:  mongoose.Types.ObjectId            
            },


            comment:{
               type: String
            },
            time:{
                type:Date,
                default:new Date()
            }
         

        },
    ]
},


 )

module.exports = mongoose.model('comments',commentSchema)