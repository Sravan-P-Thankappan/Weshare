import React,{useEffect,useState} from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {format} from 'timeago.js'
import axios from '../../Axios'
import { ErrorContext } from '../../Utilities/Context'

function Message({ message, own }) {
    
    const token = localStorage.getItem('usertoken')

    const {setErrors} = useContext(ErrorContext)
     const navigate = useNavigate()

    const config = {
        headers: {
            'token': token
        }
    }

 
    const [user,setUser] = useState({})


    useEffect(()=>{
         
        axios.get('/user/'+message.sender,config).then((response)=>{
         
            
            setUser(response.data)

        })
        .catch((er)=>{

            console.log(er);
            setErrors(er.response)
            navigate('/error')
        })

    },[])
  
    return (
        <>
            <div class="flex flex-col mt-5 ">


                {own ?

                    <div>

                        <div class="flex justify-end ">
                            <div
                                class="mr-2 max-w-1/3 py-3 px-4 bg-gray-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                            >
                                {message.text}
                            </div>
                            <img
                                 src={`/images/${user.profilePicture
                                 }`}
                                class="object-cover h-8 w-8 rounded-full"
                                alt=""
                            />
                        </div>

                        <div className=' flex justify-end mr-10'>
                            <p className='text-slate-600 text-sm'>{format(message.createdAt)}</p>
                        </div>

                    </div>

                    :

                    <div>

                        <div class="flex justify-start ">
                            <img
                                src={`/images/${user.profilePicture
                                }`}
                                class="object-cover h-8 w-8 rounded-full"
                                alt=""
                            />
                            <div
                                class="ml-2 py-3 max-w-1/3 px-4 bg-blue-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                            >

                                {message.text}

                            </div>

                        </div>

                        <div className=' flex justify-start ml-10'>
                            <p className='text-slate-600 text-sm'>{format(message.createdAt)}</p>
                        </div>

                    </div>

                }


            </div>


        </>
    )
}

export default Message