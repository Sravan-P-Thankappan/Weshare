import React from 'react'
import { useState,useEffect ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../Axios'
import { ErrorContext } from '../../Utilities/Context';


function Chatlist({chat,currentUser}) {
    const token = localStorage.getItem('usertoken')

    const config = {
        headers: {
            'token': token
        }
    }

    const [user,setUser] = useState({})
    const {setErrors} = useContext(ErrorContext)
     const navigate = useNavigate()

    // console.log('chaaaaaaaaatttttt',chat);

    useEffect(()=>{
        const friendId = chat.members.find((m)=> m!==currentUser.id)
           
            axios.get('/user/'+friendId,config).then((response)=>{
              
                setUser(response.data)

            })
            .catch((er)=>{
                
                console.log(er.message);
                setErrors(er.response)
                navigate('/error')
            })
            
      


    },[chat,currentUser])



    
    return (
        <>
            <div
                class="flex flex-row gap-2 py-4 px-2 justify-center items-center border-b-2"
            >
                <div class="w-12 ">
                    <img
                        src={`/images/${user.profilePicture}`}
                        class="object-cover h-12 w-12 rounded-full"
                        alt=""
                    />
                </div>
                <div class="w-full">
                    <div class="text-lg font-semibold">{user.name}</div>
                    <span class="text-gray-500"></span>
                </div>
            </div>
        </>
    )
}

export default Chatlist