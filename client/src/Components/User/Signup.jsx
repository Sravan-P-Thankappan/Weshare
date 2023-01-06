
import React, { useState, useEffect } from 'react'
import { FaGoogle } from "react-icons/fa";
import axios from '../../Axios'
import { useNavigate,Link } from 'react-router-dom'




function Signup() {



    const [value, setValue] = useState({})
    const [formError, setFormError] = useState({})
    const [userExist, setUserExist] = useState('')
    const navigate = useNavigate()

    let result




    const handlChange = (e) => {

        // console.log(e.target.value);

        let formResult = { [e.target.name]: e.target.value }

        setValue({ ...value, ...formResult })
    }

    //  console.log(value);

    const validate = (data) => {


        const errors = {}
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!data.name) {
            errors.name = 'Name Is Required'
            errors.staus = true

        }
        if (!data.email) {
            errors.email = 'Email Is Required'
            errors.staus = true

        }  else if (!regex.test(data.email)) {

            errors.email = 'Email Is Not Valid'
            errors.staus = true

        }
        if (!data.phone) {
            errors.phone = 'Phone Number Is Required'
            errors.staus = true

        }
        if (!data.password) {
            errors.password = 'Password Is Required'
            errors.staus = true

        }

        return errors

    }




    const handleSignup = (e) => {

        e.preventDefault()

        result = validate(value)
        setFormError({ ...result })

        if (Object.keys(result).length === 0) {
            console.log('if else', value);
            axios.post('/register', value).then((response) => {

                console.log('success     ', response);

                const { data: { usertoken } } = response

                localStorage.setItem('usertoken', usertoken)
                navigate('/home')


            }).catch((er) => {

                let { response: { data: { message } } } = er
                console.log('message  ', message)
                setUserExist(message)
            }

            )

            return
        }


    }






    return (

        <>
            <div className='bg-slate-200 min-h-screen flex items-center justify-center'>

                <div className='bg-white flex rounded-2xl shadow-lg max-w-3xl h-auto'>

                    <div className=' w-full sm:w-1/2 px-16'>

                        <h2 className='font-bold text-center mt-4 text-2xl text-[#0066ff]'>Sign Up</h2>
                        <h4 className='text-base mt-1 text-center'>Create Your Free Account</h4>

                        <p className='text-red-600 text-center mt-3'>{userExist}</p>

                        <form onSubmit={handleSignup} className=' flex flex-col gap-4'>


                            <input className='p-2 mt-8 rounded-xl border  ' type="text" placeholder='Name'
                                name='name'
                                value={value.name}
                                onChange={(e) => handlChange(e)}
                            />
                            <p>{formError.name}</p>

                            <input className='p-2  rounded-xl border  ' type="email" placeholder='Email'
                                name='email'
                                value={value.email}

                                onChange={(e) => handlChange(e)}
                            />

                            <p>{formError.email}</p>

                            <input className='p-2  rounded-xl border  ' type="number" placeholder='Phone'
                                name='phone'
                                value={value.phone}

                                onChange={(e) => handlChange(e)}
                            />

                            <p>{formError.phone}</p>

                            <input className='p-2 rounded-xl border ' type="password" placeholder='Password'
                                value={value.password}

                                name='password'
                                onChange={(e) => handlChange(e)}
                            />

                            <p>{formError.password}</p>

                            <button className='bg-[#0066ff] text-white  rounded-xl py-2 '>Sign Up</button>


                        </form>



                        <div className='grid grid-cols-3 items-center text-slate-400 mt-4'>
                            <hr className='border-gray-400' />
                            <p className='text-center'>OR</p>
                            <hr className='border-gray-400' />

                        </div>

                        {/* <div className='bg-slate-200 rounded-xl mb-2 py-1 flex justify-evenly'>

                            <span style={{ color: '#DB4437' }} className='my-2'>{<FaGoogle />}</span>
                            <h2 className='text-center mt-1'>Sign Up With Google</h2>

                        </div> */}

                        <p className=' ml-8 mt-0 my-5 cursor-pointer'>Already have account? <Link to={'/'}>Login</Link>  </p>


                    </div>


                    <div className='  sm:block hidden w-1/2 py-2 pr-2 '>

                        <img
                            className='rounded-2xl h-full object-cover'
                            src="https://www.muvi.com/wp-content/uploads/2021/08/download_20210813_162453.jpg" alt="" />
                    </div>


                </div>

            </div>
        </>
    )
}

export default Signup