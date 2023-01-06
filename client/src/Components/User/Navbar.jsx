import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoNotificationsOutline, IoAddCircleOutline } from "react-icons/io5";
import { TbMessageCircle } from "react-icons/tb";
import jwtdecode from 'jwt-decode'
import { ModalContext } from '../../Utilities/Context'
import { UserContext } from '../../Utilities/Context'
import { FriendContext } from '../../Utilities/Context';

import axios from '../../Axios'



function Navbar({ socket }) {


    const navigate = useNavigate()

    const { showmodal, setShowModal } = useContext(ModalContext)
    const { user, setUser } = useContext(UserContext)
    const { setFriend } = useContext(FriendContext)
    const [notificationModal, setNotificationModal] = useState(false)
    const [userDetail, setUserDetail] = useState({})

    const [searchmodal, setSearchModal] = useState(false)


    const [searchResult, setSearchResult] = useState([])
    const [value, setValue] = useState(false)

    const [notifications, setNotifications] = useState([])

    useEffect(() => {

        setUser(jwtdecode(localStorage.getItem('usertoken')))
        setValue(true)

    }, [])

    console.log('userrrrrrr', user)


    useEffect(() => {
        axios.get('/user/' + user?.id).then((response) => {

            setUserDetail(response.data)
        })
            .catch((er) => {

            })
    }, [value])




    //----------------logout----------------
    const [modal, setModal] = useState(false)
    const handleLogout = () => {
        localStorage.removeItem('usertoken')
        navigate('/')
    }

    const navigatetoProfile = () => {
        setModal(!modal)
        navigate('profile')
    }

    //------------search result---------------

    const handleChange = (e) => {

        if (e.target.value.length !== 0) {

            setSearchModal(true)
            let result = e.target.value
            axios.get('/usersearch/' + result).then((response) => {

                const { data } = response
                setSearchResult(data)
            }).catch((er) => {

            })


        }
        else setSearchModal(false)

    }

    // console.log(user);
    //------------profile view-----------------

    const profile = (userid) => {

        console.log(userid, user);
        if (userid === user.id) {
            navigate('profile')
        }


        else {

            setFriend(userid)

            console.log('friend check     ', userid);
            navigate('friendprofile')

        }
    }


    useEffect(() => {

        socket?.on('getNotification', (data) => {

            setNotifications((prev) => [...prev, data])
        })
    }, [socket])


    const displayNotificaion = ({ senderName, type }) => {
        let action
        if (type === 1) {
            action = 'liked'
            return (
                <p>{`${senderName} ${action} your post  `}</p>
            )
        }
        else if (type === 2) {

            action = 'commented'
            return (
                <p>{`${senderName} ${action} your post  `}</p>
            )
        }
        else if (type === 3) {
            action = 'following'
            return (
                <p>{`${senderName} started ${action} you `}</p>
            )
        }

        // return (
        //     <p>{`${senderName} ${action} ${action === 'liked' || action === 'commented' ? 'your post' : 'you'} `}</p>
        // )
    }
    console.log('notification checking', notifications)


    const clearNotification = () => {
        setNotificationModal(!notificationModal)
        setNotifications([])

    }


    return (

        <>

            <div className='flex justify-around bg-white w-full py-3 px-4 shadow-md'>
                <div className='w-2/12 ml-5'>
                    <Link to={'feed'}>
                        <h3 className='text-2xl text-blue-700 font-bold'>weShare</h3>
                    </Link>
                </div>

                <div className='w-4/12 '>
                    <input className=' bg-slate-200 w-8/12 rounded-2xl p-1 pl-2 text-gray-500 focus:text-slate-900 outline-none' type="search"
                        placeholder='search... '

                        // value={inputSearch}
                        onChange={handleChange}
                    />
                </div>

                <div className='flex justify-evenly list-none gap-x-20 mr-5'>

                    <Link to={'chat'}><li><TbMessageCircle size={25} /></li></Link>
                    <li className='cursor-pointer' onClick={() => setNotificationModal(!notificationModal)}><IoNotificationsOutline size={25} />

                        {notifications.length > 0 && <p className="relative inline-flex items-center rounded   px-2.5 py-1.5 text-xs font-medium">
                            <span className="absolute -top-10 -right-2 h-5 w-5 rounded-full bg-[#ee1d52] flex justify-center items-center items"><span className='text-white text-xs'>{notifications.length}</span></span>
                        </p>}
                    </li>



                    <li className='cursor-pointer' onClick={() => setShowModal(!showmodal)}><IoAddCircleOutline size={25} /></li>
                    <li>

                        <div class="relative ">
                            <div className='w-8'>

                                <img className='cursor-pointer object-cover  inline-block rounded-full w-8 h-8 ring-2' src={`/images/${userDetail.profilePicture}`} alt=""
                                    onClick={() => setModal(!modal)}
                                />
                            </div>

                            {modal && <div x-show="dropdownOpen" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">

                                <p class="block cursor-pointer px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"

                                >
                                    {user.name}
                                </p>
                                <p onClick={navigatetoProfile} class="cursor-pointer block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white" >
                                    your profile
                                </p>

                                <p class="block cursor-pointer px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"

                                    onClick={handleLogout}>
                                    Sign Out
                                </p>


                            </div>
                            }
                        </div>
                    </li>
                </div>

            </div>

            {searchmodal &&
                <div className='w-full h-[93%] bg-slate-700 bg-opacity-50 absolute overflow-hidden' onClick={() => setSearchModal(false)}>

                    <div className='w-1/4 h-auto relative '>

                        {searchResult.map((user) => {

                            return (
                                <div className='flex h-auto  gap-5 absolute w-full top-4 
                                sm:left-48 lg:left-[450px] p-3 rounded bg-white'
                                    onClick={() => profile(user._id)}
                                >
                                    <div className='w-12 rounded-full'>
                                        <img className='h-12 w-12  rounded-full object-cover  ring-2'
                                            src={`/images/${user.profilePicture}`}
                                            alt="" />
                                    </div>

                                    <div className='mt-3'>
                                        <p>{user.name}</p>
                                    </div>
                                </div>

                            )
                        }

                        )}

                    </div>

                </div>

            }



            {notificationModal &&


                <div className='w-full h-[93%] bg-slate-700 bg-opacity-50 absolute  overflow-hidden' >



                    <div className=' w-64  h-36  mt-2 
                     sm-mx-[50%] md:mx-[60%] lg:mx-[75%]  p-3 rounded bg-white'
                    >

                        {
                            notifications.length > 0 ?

                                <>
                                    <div className='h-5/6 '>

                                        {

                                            notifications.map((n) => {
                                                return (
                                                    displayNotificaion(n)
                                                )
                                            })

                                        }
                                    </div>

                                    <div className='w-full flex '>

                                        <p className='text-blue-500 mx-auto cursor-pointer  mt-1.5 ' onClick={clearNotification}>Mark As Read</p>
                                    </div>

                                </>

                                :

                                <div className='h-full  flex justify-center items-center '>

                                    <p className=''>No Notifications</p>

                                </div>
                        }

                    </div>

                </div>

            }


        </>


    )
}

export default Navbar