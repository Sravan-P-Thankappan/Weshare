
import React, { useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import axios from '../../Axios'
import GoogleLogin from 'react-google-login'


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

  

    const handelLogin = (e) => {
        e.preventDefault()
        if (email.length == 0 || password.length == 0) {
            setError('All field is required')
            return;
        }

        let userData = {
            email,
            password
        }
        axios.post('/login', userData).then((response) => {

            const { data: { usertoken } } = response

            localStorage.setItem('usertoken', usertoken)

            navigate('/home')

        }).catch(err => {

            const { response: { data: { message } } } = err 
            setError(message)
        })
    }

    

    return (
        <>

            <div className='bg-slate-200 min-h-screen flex items-center justify-center'>

                <div className='bg-white flex rounded-xl shadow-2xl max-w-3xl h-auto'>

                    <div className=' w-full sm:w-1/2 px-16'>

                        <h2 className='font-bold text-center mt-4 text-2xl text-[#0066ff]'>Login</h2>
                        <h4 className='text-base mt-1 text-center'>Welcome Back</h4>

                        <p className='text-red-500 text-center mt-1'>{error}</p>
                        {/* {error&&<p className='text-red-500 text-center mt-1'>All Field Is Required</p>} */}

                        <form onSubmit={handelLogin} className=' flex flex-col gap-4'>

                            <input className='p-2 mt-8 rounded-xl border outline-0 ' type="email" placeholder='Email'
                                name='email'
                                onChange={(e) => setEmail(e.target.value)} />

                            <input className='p-2 rounded-xl border outline-0' type="password" placeholder='Password'

                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button className='bg-[#0066ff] text-white  rounded-xl py-2 '>Login</button>


                        </form>

                        <div className='flex justify-end mt-2 mr-1 cursor-pointer'>
                           <Link to={'/forgot'}> <p className='text-sm text-slate-600'>Forgot Password?</p></Link>
                        </div>

                        <div className='grid grid-cols-3 items-center text-slate-400 mt-3 '>
                            <hr className='border-gray-400' />
                            <p className='text-center'>OR</p>
                            <hr className='border-gray-400' />

                        </div>

                        



                        {/* <div  className='  mb-2 py-2 flex justify-evenly w'>

                           
                        <GoogleLogin 
                            clientId="987650445241-5sl5ui5b5kcb6m66moa37uvs8ra1s12g.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responsSuccesseGoogle}
                            onFailure={responsErroreGoogle}
                            cookiePolicy={'single_host_origin'}
                        />

                        </div> */}

                        {/* <div className='bg-slate-200 rounded-xl mb-2 py-2 flex justify-evenly'>

                            <span style={{color:'#DB4437'}} className='mt-1.5 '>{< FaGoogle/>}</span>
                            <h2 className='text-center'>Login With Google</h2>

                        </div> */}

                        <p className=' ml-5 my-5 cursor-pointer'>Don't you have account? <Link to={'/signup'}>Sign Up</Link>  </p>


                    </div>

 
                    <div className='  sm:block hidden w-1/2 py-2 pr-2 '>

                        <img
                            className='rounded-2xl h-full object-cover'
                            src="https://cdn.pixabay.com/photo/2020/05/18/16/17/social-media-5187243__340.png" alt="" />
                    </div>


                </div>

            </div>







        </>

    )
}

export default Login