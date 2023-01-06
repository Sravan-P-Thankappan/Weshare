const nodemailer = require('nodemailer')
const userModel = require('../Model/usermodel')
const bcrypt = require('bcrypt')

let result
let email

module.exports=  {


    getOtp: (req,res)=>{
         
        console.log(req.body);
        email = req.body.email
        console.log(email);

       userModel.findOne({email:req.body.email}).then((response)=>{
       if(response){


        const numbers = [0,1,2,3,4,5,6,7,8,9]
        let otp = ''
        
        const otpGenarator = (req,res)=>{
             for (let index = 0; index < 4; index++) {
                   
                 otp = otp+numbers[Math.floor(Math.random()*10)]
             }
            
             
            return otp
        }   
          
        
        result = otpGenarator()
            
          
          const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
               user:process.env.email,
               pass:process.env.password
            }
        })
        
        const mailOptions = {
           from:process.env.email,
           to:email,
           subject:'Password Reset',
           text:`Your OTP (One Time Password ) for password resetting is ${result}`
        }
        
        transporter.sendMail(mailOptions,(err,info)=>{
           if(err){
               console.log(err);
        
               res.status(500).json({message:err.message})
               
           }else{
                
            res.status(200).json({message:'Otp Sent Successfully'})
            
           }
        })


       }  
       
       else{
             res.status(404).json({message:'Email does not exist'})
       }

       })
       .catch((er)=>{
         
        res.status(500).json({message:er.message})

       })    
   
                     
        },

    verifyOtp:(req,res)=>{     
               

        console.log(req.body);
        
             if ( req.body.otp === result)
             {
                console.log('otp verified');

            bcrypt.hash(req.body.password,10).then((password)=>{

                userModel.updateOne({email:email},{

                    $set:{password:password}
                })
                .then(()=>{

                    res.status(200).json({message:'Password updated'})
                })
            })           
             }

             else  res.status(401).json({message:'OTP Is Invalid'})               
        } 

}







