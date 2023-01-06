import React, { useState, useEffect, useContext,useRef } from 'react'
import axios from '../../Axios'
import Chatlist from './Chatlist'
import Message from './Message'
import { UserContext,ErrorContext} from '../../Utilities/Context'
import {  AiOutlineSend } from "react-icons/ai";
import {io} from 'socket.io-client'
import { useNavigate } from 'react-router-dom'


function Chat({socket}) {

    const token = localStorage.getItem('usertoken')

    const config = {
        headers: {
            'token': token
        }
    }
    const {setErrors} = useContext(ErrorContext)
    const navigate = useNavigate()
    const [showChat,setShowChat] = useState(false)
    const { user } = useContext(UserContext)
    const [chatlist, setChatlist] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage,setNewMessage] = useState('')
    // const [socket,setSocket] = useState(null)
    const [arrivalMessage,setArrivalMessage] = useState(null)

    const scrollRef = useRef(null)

//    useEffect(()=>{     
//        setSocket(io("ws://localhost:8900"))
//    },[])

//    useEffect(()=>{

//     socket?.emit('addUser',user.id)
    
   
//    },[socket,user])


   const getNewMessages = ()=>{

    console.log('arrival msggggggg');
    socket?.on('getMessage',data=>{
           
        console.log('get messagessssssssssss',data);

        setArrivalMessage({
            sender:data.senderId,
            text:data.text ,
            createdAt:Date.now()
        })
    })
   }

useEffect(()=>{

    getNewMessages()
   
},[])



useEffect(()=>{
       
    console.log('live chatttttttttttt')
     arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
     
     setMessages((m)=>[...m,arrivalMessage])

},[arrivalMessage,currentChat])


    
const getChatlist = ()=>{
    axios.get('/chatlist/' + user.id,config)
    .then((response) => {

        const { data } = response

        setChatlist(data)

    })
    .catch((er) => {

        console.log(er.message);
        setErrors(er.response)
        navigate('/error')
    })
}

    useEffect(() => {       
        getChatlist()
    }, [])



    useEffect(()=>{
       
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })

    },[messages])
        

   

    const getCurrentChat = (item) => {

        setCurrentChat(item)
        setShowChat(true)
        axios.get('/message/' + item._id,config)
        .then((response) => {

            setMessages(response.data)
        })
        .catch((er) => {
            console.log(er);
            setErrors(er.response)
            navigate('/error')
        })
     
    }


    const handleMessage = ()=>{

        let data = {
            sender:user.id,
            chatId:currentChat._id,
            text:newMessage
        }

        const recieverId = currentChat.members.find((member)=>
            member!== user.id
        )


        socket.emit('sendMessage',{
            senderId:user.id,
            recieverId,
            text:newMessage
        })
     
        axios.post('/addmessage',data,config).then((response)=>{
      
            console.log(response.data);
            setMessages([...messages,response.data])

            setNewMessage('')
            getNewMessages()
            getChatlist()
        })
        .catch((er)=>{

            console.log(er);
            setErrors(er.response)
            navigate('/error')
        })


    }



    return (
        <div className='min-h-[80vh]  sm:min-h-[91vh] mt-2 sm:mt-0'>

            <div class=" px-5   mb-2 rounded-lg ">

                <div class="flex flex-row gap-3 justify-around h-[86vh] sm:h-[90vh] -mt-1   ">

                    {/* <!-- chat list --> */}

                    <div class={`${showChat?'hidden':''} sm:flex flex-col w-full sm:w-3/12 border-r-2 overflow-y-auto shadow-2xl rounded-xl bg-white`}>

                        <div class="border-b-2 py-4 px-2">
                            <input
                                type="text"
                                placeholder="search chatting"
                                class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                            />
                        </div>


                        {chatlist.map((item) => {
                            return (

                                <div onClick={() => getCurrentChat(item)}>
                                    <Chatlist chat={item} currentUser={user} />
                                </div>
                            )
                        })}
                    </div>

                    <div class={`${showChat?'':'hidden'}    sm:w-9/12   px-5 sm:flex flex-col justify-between shadow-2xl rounded-xl bg-white `}>

                        {currentChat ?
                            <>
                                <div className='h-full overflow-y-scroll scrollbar-hide  '>
                                    {messages.map((msg) => {

                                        return (

                                            <div ref={scrollRef}>
                                               <Message message={msg} own={msg.sender === user.id} />
                                            </div>
                                        )

                                    })}

                                </div>

                                    <div class="py-5 mb-3 relative ">
                                        <input

                                            class="w-full bg-gray-300 py-5 px-3 rounded-xl focus:outline-none"
                                            type="text"
                                            name='message'
                                            placeholder="type your message here..."
                                            onChange={(e)=>setNewMessage(e.target.value)}
                                            value={newMessage}
                                        />
                                        <div className='absolute top-11 right-0 px-3'>
                                            <button onClick={handleMessage}><AiOutlineSend/></button>
                                        </div>
                                    </div>



                             

                            </>
                            :
                            <>
                                <div className=' flex justify-center '>

                                    <img className='object-cover h-[700px]' src="https://img.freepik.com/free-vector/conversation-concept-illustration_114360-1305.jpg?w=740&t=st=1670057295~exp=1670057895~hmac=97da24b00cd1136fc9d078973561bb772990c92b7f787e14ed4d29a972c97c8e" alt="" />

                                </div>

                            </>

                        }

                    </div>
                </div>


            </div>
        </div>

    )
}

export default Chat