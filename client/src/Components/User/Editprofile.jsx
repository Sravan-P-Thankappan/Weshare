import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../Axios'
import { UserContext, ErrorContext } from '../../Utilities/Context'


function Editprofile() {

    let result

    const token = localStorage.getItem('usertoken')

    const config = {
        headers: {
            'token': token
        }
    }
    const { user } = useContext(UserContext)
    const { setErrors } = useContext(ErrorContext)
    const navigate = useNavigate()

    const [userDetail, setUserDetail] = useState({})
    const [file, setFile] = useState()
    const [image, setImage] = useState()
    const [formError, setFormError] = useState({})

    const getDetails = () => {

        axios.get('/userdetails/' + user.id, config).then((response) => {

            const { data } = response
            setUserDetail(data)
            console.log(response);
        })
            .catch((er) => {
                console.log(er);
                setErrors(er.response)
                navigate('/error')
            })
    }

    useEffect(() => {
        getDetails()
    }, [])

    const handleChange = (e) => {

        let data = { [e.target.name]: e.target.value }
        console.log(data);

        setUserDetail({ ...userDetail, ...data })


    }


    //---------------validation-------------
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

        } else if (!regex.test(data.email)) {

            errors.email = 'Email Is Not Valid'
            errors.staus = true

        }
        if (!data.phone) {
            errors.phone = 'Phone Number Is Required'
            errors.staus = true

        }
     

        return errors

    }


    const handleEdit = (e) => {

        e.preventDefault()

        result = validate(userDetail)
        setFormError({ ...result })


        if (Object.keys(result).length === 0) {


            axios.post('/editprofile/' + user.id, userDetail, config).then((response) => {

                console.log(response);
                getDetails()
            }).catch((er) => {

                console.log(er);
                setErrors(er.response)
                navigate('/error')

            })

            return
        }

    }


    const handleProfilePic = (e) => {

        setFile(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])

    }

    const uploadProfilePic = (e) => {

        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)

        axios.post('/uploadprofilepicture/' + user.id, formData, config).then((response) => {


        })
            .catch((er) => {

                setErrors(er.response)
                navigate('/error')

            })
    }


    return (


        <div>
            <div className="h-full px-5 mt-5 mb-5">

                <div className=" block md:flex justify-evenly sm:pt-4">

                    <div className="w-full h-1/2 md:w-1/4 p-4 text-center  bg-white shadow-xl ">
                        <div className="flex justify-center -mb-3 ">
                            <span className="text-xl font-semibold block text-center ml-4 ">{userDetail.name}</span>
                        </div>

                        <form onSubmit={uploadProfilePic} encType='multipart/form-data'>
                            <div className="w-full p-8 mx-2 flex justify-center">
                                {file ? <img id="showImage" className="max-w-xs w-32 h-32 items-center border rounded-full ring-2 ring-blue-400" src={file} alt="" /> :
                                    <img id="showImage" className="max-w-xs w-32 h-32 items-center border rounded-full ring-2 ring-blue-400" src={`/images/${userDetail.profilePicture}`} alt="" />

                                }                            </div>
                            <div className='flex flex-col -mt-5'>
                                <input type="file" id='profile' name='image' hidden onChange={handleProfilePic} />
                                <label className='text-blue-400 cursor-pointer' htmlFor='profile'>Choose Profile Picture </label>
                            </div>

                            <button type='submit' className='mt-3 bg-blue-700 p-2 px-5 rounded-lg content-center text-white md:mx-auto'>Upload</button>
                        </form>
                    </div>



                    <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-xl">
                        <div className="rounded  shadow p-6">
                            <form onSubmit={handleEdit}>

                                <div className="pb-6">
                                    <label for="name" className="font-semibold text-gray-700 block pb-1">Username</label>
                                    <div>
                                        <input id="username" name='name' className="border-1 rounded-md px-4 py-2 w-full outline outline-1 text-slate-400"
                                            type="text"
                                            defaultValue={userDetail.name} onChange={handleChange} />
                                    </div>
                                </div>
                                <p className='text-red-500 -mt-3' >{formError.name}</p>


                                <div className="pb-4">
                                    <label for="about" className="font-semibold text-gray-700 block pb-1">Email</label>
                                    <input id="email" name='email' className="border-1 rounded-md px-4 py-2 w-full outline outline-1 text-slate-400"
                                        type="email "
                                        defaultValue={userDetail.email} onChange={handleChange} />
                                </div>
                                <p className='text-red-500 -mt-3'>{formError.email}</p>


                                <div className="pb-4">
                                    <label for="about" className="font-semibold text-gray-700 block pb-1">Phone</label>
                                    <input id="phone" name='phone' className="border-1  rounded-md px-4 py-2 w-full outline outline-1 text-slate-400"
                                        type="phone "
                                        defaultValue={userDetail.phone} onChange={handleChange} />
                                </div>
                                <p className='text-red-500 -mt-3'>{formError.phone}</p>

                                <div className="pb-4">
                                    <label for="about" className="font-semibold text-gray-700 block pb-1">Career</label>
                                    <input id="career" name='career' className="border-1 rounded-md px-4 py-2 w-full outline outline-1 text-slate-400"
                                        type="text"
                                        defaultValue={userDetail.career} onChange={handleChange} />
                                </div>

                                <div className="pb-4">
                                    <label for="about" className="font-semibold text-gray-700 block pb-1">Bio</label>
                                    <input id="bio" name='bio' className="border-1  rounded-md px-4 py-2 w-full outline outline-1 text-slate-400"
                                        type="text"
                                        defaultValue={userDetail.bio} onChange={handleChange} />
                                </div>

                                <button className='bg-blue-700 p-2 rounded-xl content-center text-white md:mx-auto ' >Update Profile</button>

                            </form>

                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Editprofile