const express = require('express')

const router = express.Router()

const adminContreller = require('../Controller/admincontroller')


const jwt = require('jsonwebtoken')
 
 const verify = (req,res,next)=>{  

      
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


router.post('/login',adminContreller.doLogin)

router.get('/totalusers',adminContreller.totalUser)

router.get('/users',adminContreller.getAllusers)

router.get('/block',verify,adminContreller.blockUser)

router.get('/unblock',verify,adminContreller.unBlockUser)

router.get('/post',adminContreller.getPost)


router.post('/blockpost',adminContreller.blockPost)
router.post('/unblockpost',adminContreller.unblockPost)









module.exports = router