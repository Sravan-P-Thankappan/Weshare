const adminModel = require('../Model/adminmodel')
const userModel = require('../Model/usermodel')
const postModel = require('../Model/postmodel')

const jwt = require('jsonwebtoken')


const mongoose = require('mongoose')
const postmodel = require('../Model/postmodel')
const ObjectId = mongoose.Types.ObjectId




module.exports ={

    doLogin:(req,res)=>{

        console.log(req.body);
            
        adminModel.findOne({email:req.body.email}).then((admin)=>{
                
            if(admin){

                console.log(admin);
                
                if(req.body.password==admin.password) {

                    
                    const payload = {
                        id: admin._id.toString(),
                        email: admin.email
                    }

                const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: '3d' })

                    res.status(200).json({message:'Login Success',adminToken:'Bearer '+token})
                } 
                else{
                    res.status(401).json({message:'Incorrect Password'})
                }
            } else{
                 
                res.status(404).json({message:'Incorrect Email'})
            }
        })

    },


    totalUser:(req,res)=>{
         userModel.count().then((count)=>{
            res.status(200).json({count:count})
         })
        
    },

    getAllusers:(req,res)=>{
            
        userModel.find().then((users)=>{
             
            res.status(200).json(users)
        }).catch((err)=>{
            res.status(500).json({message:err.message})
        })
    },

    blockUser:(req,res)=>{
             
        let userId = req.headers.id
        console.log(req.headers);
        console.log(typeof userId);

        userModel.findByIdAndUpdate(userId,{status:true}).then(()=>{
             
             res.json({message:'success'})

        }).catch(er=>console.log(er.message))

    },

    unBlockUser:(req,res)=>{
             
        let userId = req.headers.id

        console.log( req.headers);

        console.log('unblock status    ',userId);
        console.log(typeof userId);

        userModel.findByIdAndUpdate(userId,{status:false}).then((user)=>{

             res.json({message:'success'})

        }).catch(er=>console.log(er.message))

    },



   getPost:(req,res)=>{
    
      postmodel.aggregate([

        {$unwind:'$post'},
        {$project:{post:1,totalReports:{$size:'$post.report'}}},

        {$project:{post:1,totalReports:1,status:{$gt:['$totalReports',0]}}},
        {$match:{status:true}},
        {$sort:{totalReports:-1}}
      ])
      .then((response)=>{

        res.status(200).json(response)
      })
      .catch((er)=>{
             
        res.status(500).json({message:er.message})
      })

   },


   blockPost:(req,res)=>{
          
    console.log(req.body)

    postModel.updateOne({'post._id': ObjectId(req.body.postId) },
    
    {$set:{'post.$.reportStatus':true}}
    )
    .then((data)=>{
          
        res.status(200).json(data)
        console.log('success')
     

    })  
    .catch((er)=>{

        console.log(er)

        res.status(500).json({message:er.message})
    })
       
   },


   unblockPost:(req,res)=>{
    
    postModel.updateOne({'post._id': ObjectId(req.body.postId) },
    
    {$set:{'post.$.reportStatus':false}}
    )
    .then((data)=>{
          
        res.status(200).json(data)
        console.log('success')
     

    })  
    .catch((er)=>{

        console.log(er)

        res.status(500).json({message:er.message})
    })
   }
}