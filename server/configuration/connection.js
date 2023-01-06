const mongoose = require('mongoose')

 const connection = ()=>{
    
     mongoose.connect(process.env.URL).then(()=>{
        
        console.log('Database Connected');
    
     }).catch((e)=>console.log(e.message))
     
    
}

 module.exports = connection 

