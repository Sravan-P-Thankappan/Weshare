import React,{useEffect,useState} from 'react'
import axios from '../../Axios'

function Home() {
     const[usercount,setUserCount]= useState(0)

     useEffect(()=>{
        
        axios.get('/admin/totalusers').then((response)=>{
            const{data:{count}} = response
            console.log(count);
            setUserCount(count)

        }).catch((err)=>{
            console.log(err.message);
        }) 

     },[])

  return (
    <div  className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 justify-items-center '>
       <div className='bg-white rounded-md  w-full shadow-lg sm:w-6/12 h-auto p-5 flex flex-col items-center'>
             <h1 className='text-lg font-semibold'>Users</h1>
             <p className='mt-2 font-medium text-lg'>{usercount}</p>
       </div>
       <div className='bg-white rounded-md shadow-lg w-full sm:w-6/12 h-auto p-6 flex flex-col items-center '>
       <h1 className='text-lg font-semibold'>Post</h1>
       <p className='mt-2 font-medium text-lg'>0</p>

       </div>
    </div>
  )
}

export default Home