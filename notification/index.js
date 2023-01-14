const {Server, Socket} = require("socket.io")

const io = new Server(7000,{
    path:"/notification/socket.io",
    cors:{
        origin:"https://weshare.fun"
    }
})
  

let onlineUsers = []

const addNewUser = (username,socketId)=>{
      
    console.log('add new user function')
    let result  = onlineUsers.some((user)=>{
        return user.username === username
     })
 
    console.log(result)
     if(!result) {
         
        onlineUsers.push({username,socketId})

        console.log('onlineUsers',onlineUsers)
         return
     }

}




const removeUser = (socketId)=>{

     onlineUsers = onlineUsers.filter(user=>user.socketId!==socketId)


}

const getUser = (username)=>{
    return onlineUsers.find(user=>user.username===username)
}

io.on('connection',(socket)=>{
        
    console.log('user has connected')

    
    socket.on('newUser',(username)=>{
         
        console.log('newUser event',username)
         addNewUser(username,socket.id)

    })
    
    console.log(onlineUsers)

    socket.on('sendNotification',({senderName,recieverName,type})=>{
          
        console.log('send notification checking',senderName,recieverName,type)

        const reciever = getUser(recieverName)
          
        console.log('reciever',reciever)
        io.to(reciever?.socketId).emit('getNotification',{
            senderName,
            type
        })
    })

    
    socket.on('disconnect',()=>{

        console.log('user has disconnected')
        removeUser(socket.id)
    })
})