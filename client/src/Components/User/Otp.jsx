import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import axios from '../../Axios'

function Otp() {

    const navigate = useNavigate()
   
    const [details,setDetails] = useState({})
    const handleChange = (e)=>{
           let data = {[e.target.name]:e.target.value}
         
          console.log(data);

           setDetails({...details,...data})
           
    }

    const handleSubmit = (e)=>{
            
        e.preventDefault()

        axios.post('/verifyotp',details).then((response)=>{
          
            console.log(response);
            
            navigate('/')

        }).catch((er)=>{

            console.log(er);
        })

    }
   


    return (
        <div>

            <div className='flex flex-col px-2 justify-center items-center h-screen'>

                <div className='w-full h-1/2 sm:h-auto md:w-4/12 bg-white  rounded-md shadow-xl p-10 '>
                    <p className='text-center text-base text-slate-700 '>OTP has been sent to your email</p>
                    <div className='mt-4'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col space-y-10'>
                                <input placeholder='Enter OTP' className='w-full mt-5 p-2 rounded-md focus:outline-none bg-slate-100'
                                    onInput={(e) => {
                                        if (e.target.value.length > e.target.maxLength) {
                                            e.target.value = e.target.value.slice(0, e.target.maxLength);

                                        }
                                    }} 
                                    name='otp'
                                    maxLength={4}
                                    onChange={handleChange}
                                    type="number" />
                                <input placeholder='Enter New Password' className='w-full mt-2 p-2 rounded-md focus:outline-none bg-slate-100'
                                    name='password'
                                    type="password"
                                    onChange={handleChange}
                                    />


                                <div className='flex justify-center mt-0'>
                                    <button className='bg-blue-600 mt-1 px-6 py-2 rounded-md text-slate-200'>Submit</button>

                                </div>
                            </div>
                        </form>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Otp