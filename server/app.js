
const dotenv = require('dotenv')
dotenv.config()
const express  = require('express')
const app = express()
const cors = require('cors')
const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')

const dbConnection = require('./configuration/connection')

// app.use(cors({
//     methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
// }))

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended:'true'}))

app.use((req,res,next)=>{
    console.log(req.method,req.path);
    next()
})


// -------db connection----------

dbConnection()

app.use('/api/',userRoute)
app.use('/api/admin',adminRoute)



app.listen(process.env.PORT,()=>{
    console.log('server started on port',process.env.PORT );
}) 