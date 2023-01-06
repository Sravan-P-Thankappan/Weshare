

const {Server} = require("socket.io")

const io = new Server(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let users= []

const addUser = (userId,socketId)=>{

    let result  = users.some((user)=>{
       return user.userId === userId
    })


    if(!result) {
        
        users.push({userId,socketId})
        return
    }
}

const removeUser = (socketId)=>{
  
    users = users.filter((user)=>user.socketId!==socketId)
}


const getUser = (recieverId)=>{
    
    console.log(users)
    return users.find((user)=>user.userId===recieverId)
}






io.on("connection", (socket) => {
   

    //-------when user is connected-----------
    console.log('a user connected',socket.id)

    socket.on('addUser',(userId)=>{
         
      
        console.log('add userrrrrrrr')
        addUser(userId,socket.id) 

        io.emit('getUsers',users)
       
    })


    //---------send and get messages-----------

    socket.on('sendMessage',({senderId,recieverId,text})=>{


        console.log('send messsssss')

        const reciever = getUser(recieverId)

        console.log('reciever   ' ,reciever)
        
        io.to(reciever?.socketId).emit('getMessage',{
             
            senderId,
            text
        })

    })


    //---------when user is disconnected-----------
    socket.on('disconnect',()=>{

        console.log('disconnected')
        removeUser(socket.id)
    })
  
   
 
  });

    