import React, { useState } from 'react'
import axios from '../../Axios'
import { useNavigate } from 'react-router-dom'

function Forgot() {

    const [email, setEmail] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    let [formError, setFormError] = useState(null)

    const validate = (data) => {
            
        console.log('validate',data)
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (data===undefined) {
            formError = 'Please Enter Email'
        }
        else if (!regex.test(data)) {
            formError = 'Email is not valid'
        }

        return formError

    }

    const getOtp = (e) => {

        e.preventDefault()

        let result = validate(email)
        console.log("result  ", result)
        setFormError(result)

        if (!formError) {


            axios.post('/getotp', { email }).then((response) => {

                console.log('otp     ', response);
                navigate('/otp')

            }).catch((er) => {


                setError(er.response.data.message)
            })
        }

        return

    }

    return (

        <div>
            <div className='flex flex-col px-2 justify-center items-center h-screen'>

                <div className='w-full h-1/2 sm:h-auto md:w-4/12 bg-white  rounded-md shadow-xl p-10 '>
                    <p className='text-center text-xl text-slate-700 '>Forgot Password?</p>

                    <div className='mt-6'>
                        <form onSubmit={getOtp} >
                            <p className='text-red-500 text-center -mt-2'>{error}</p>
                            <p className='text-red-500 text-center'>{formError}</p>
                            <input placeholder='Your Email' className='w-full mt-2 p-2 rounded-md focus:outline-none bg-slate-100'
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className='flex justify-center mt-3'>
                                <button type='submit' className='bg-blue-600 mt-3 px-6 py-2 rounded-md text-slate-200'>Get OTP</button>

                            </div>

                        </form>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Forgot