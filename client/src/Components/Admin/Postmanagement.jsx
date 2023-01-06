import React,{useState,useEffect} from 'react'
import axios from '../../Axios'
import {format} from 'timeago.js'

function Postmanagement() {
  
    const [totalPost,setTotalPost] = useState([])

    const getPost = ()=>{
        axios.get('/admin/post').then((response)=>{
            console.log(response.data)
            setTotalPost(response.data)
        })
        .catch((er)=>{
 
        })
    }
 
    useEffect(()=>{
        getPost()
    },[])


    const handleUnBlock = (postId)=>{
        axios.post('/admin/unblockpost',{postId})
        .then(()=>{
            getPost()
    
            
        })
        .catch((er)=>{
            
        })
    }
   
    const  handleBlock = (postId)=>{
        
        axios.post('/admin/blockpost',{postId})
        .then(()=>{
            getPost()
    
            
        })
        .catch((er)=>{
            
        })
    }



  return (

    <>
    
    <div class="table w-full p-2 ">
            <table class="w-full border shadow-lg">
                <thead>
                    <tr class="bg-gray-50 border-b">

                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                No

                            </div>
                        </th>
                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                Post

                            </div>
                        </th>
                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                Description

                            </div>
                        </th>
                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                Date

                            </div>
                        </th>
                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                Reports

                            </div>
                        </th>
                        <th class="p-2 border-r cursor-pointer text-sm font-thin text-blue-800">
                            <div class="flex items-center justify-center">
                                Action

                            </div>
                        </th>
                    </tr>
                </thead>


                <tbody>

                    {totalPost.map((post, index) => {

                        return (

                            <tr class="bg-gray-100 text-center border-b text-sm text-gray-600">
                                <td class="p-2 border-r">{index + 1}</td>
                                <td class="p-2 border-r "> <img className='w-20 h-20 mx-auto' src={`/images/${post.post.images}`} alt="" /> </td>
                                <td class="p-2 border-r">{post.post.description}</td>
                                <td class="p-2 border-r">{format(post.post.date)}</td>
                                 <td class="p-2 border-r">{post.totalReports}</td>  

                                <td class='py-3'>
                                   {post.post.reportStatus
                                   
                                   ?
                                            <button class='bg-green-500 rounded-sm p-2 text-white hover:shadow-lg text-xs font-thin'
                                                onClick={() => { handleUnBlock(post.post._id) }}

                                            >Unblock</button>
                                        
                                           :


                                           <button class='bg-red-500 rounded-sm p-2 text-white hover:shadow-lg text-xs font-thin'
                                                onClick={() => { handleBlock(post.post._id) }}

                                            >Block</button>


                                        }
                                  
                                </td>

                            </tr>
                        )
                    })


                    }

 

                </tbody>
            </table>
        </div>
    
    </>

    )
}

export default Postmanagement