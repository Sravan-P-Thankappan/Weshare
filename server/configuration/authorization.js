 
 const jwt = require('jsonwebtoken')
 
 const verify = (req,res,next)=>{  
         
    console.log(req.headers)
        let token = req.headers['token']?.split(' ')[1]

        if(token){
            jwt.verify(token,process.env.jwtSecret,(err,data)=>{
                if(err) return res.status(401).json({message:'Authentication Failed'})
                             
                next()
            })
        }
        else{

            res.status(401).json({message:'You Are Not Authorized'})
        }
 }

 module.exports = verify