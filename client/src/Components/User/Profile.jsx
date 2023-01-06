import React, { useEffect, useContext, useState } from 'react'
import { ErrorContext, UserContext } from '../../Utilities/Context'
import axios from '../../Axios'
import { useNavigate } from 'react-router-dom'
import Postmodal from './Postmodal'


function Profile() {


    const token = localStorage.getItem('usertoken')

    const config = {
        headers: {
            'token': token
        }
    }

    const { setErrors } = useContext(ErrorContext)

    const [post, setPost] = useState([])
    const [userDetail, setUserDetail] = useState({})
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [followingModal, setFollowingModal] = useState(false)
    const [followersModal, setFollowersModal] = useState(false)
    const [postDetails, setPostDetails] = useState([])
    const [detailModal, setDetailModal] = useState(false)
    const navigate = useNavigate()

    const { user } = useContext(UserContext)

    useEffect(() => {

        axios.get('/userpost/' + user.id, config).then((response) => {
            console.log(response);
            const { data } = response
            setPost(data)
        })
            .catch((er) => {
                console.log(er);
                setErrors(er.response)
                navigate('/error')
            })



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


        axios.get('/followerslist/' + user.id, config).then((response) => {
            const { data } = response

            console.log('jsdhkjhk  ', data);
            setFollowers(data[0].followers)
            setFollowing(data[0].following)

        })
            .catch((er) => {

                console.log(er);
                setErrors(er.response)
                navigate('/error')
            })



    }, [])

    const getPostDetails = (pId) => {
        console.log(pId, 'pid')
        axios.get('/postdetails/' + pId).then((response) => {

            // console.log(response.data)

            setPostDetails(response.data)
            setDetailModal(true)

        })
            .catch((er) => {

                console.log(er)
                setErrors(er.response)
                navigate('/error')
            })
    }


    const editProfile = () => {
        navigate('/home/editprofile')
    }


    return (
        <div className='min-h-[94.5vh]'>

            <div class="max-w-2xl mx-auto mt-2">

                <div class="px-3 py-2">

                    <div class="flex flex-col gap-1 text-center ">
                        <img class="p-1 mx-auto  w-28 justify-content-center h-28 rounded-full ring-2 ring-gray-300 dark:ring-blue-300" src={`/images/${userDetail.profilePicture
                            }`} alt="" />
                        <p class="font-serif font-semibold">{userDetail.name}</p>
                        <span class="text-sm text-black">{userDetail.career}</span>
                        <span class="text-sm text-black">{userDetail.bio}</span>
                    </div>



                    <div class="flex justify-center items-center gap-2 my-5">
                        {/* <div class="font-semibold text-center mx-4">
                            <p class="text-black">23</p>
                            <span class="text-gray-400">Posts</span>
                        </div> */}
                        <div class="font-semibold text-center mx-4">
                            <p class="text-black cursor-pointer">{followers.length}</p>
                            <span onClick={() => setFollowersModal(true)} class="text-gray-400 cursor-pointer">Followers</span>
                        </div>
                        <div class="font-semibold text-center mx-4">
                            <p class="text-black cursor-pointer">{following.length}</p>
                            <span onClick={() => setFollowingModal(true)} class="text-gray-400 mt-1 cursor-pointer ">Folowing</span>
                        </div>
                    </div>



                    <div class="flex justify-center gap-2 my-5">
                        {/* <button class="bg-pink-500 px-10 py-2 rounded-full text-white shadow-lg">Follow</button> */}
                        <button class="bg-white border  px-4 py-1 rounded-xl shadow-lg hover:shadow text-blue-600"
                            onClick={editProfile}
                        >Edit Profile</button>
                    </div>




                    <div class="flex justify-between items-center">
                        <button class="w-full py-2 border-b-2 border-gray-700">
                            Posts
                        </button>
                        {/* <button onClick={()=>navigate('/user/profile/saved')} class="w-full py-2 border-b-2 border-black">
                         Saved
                      </button> */}
                    </div>




                </div>
            </div>



            <div className='px-3 py-2 max-w-2xl mx-auto mt-2'>



                <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 my-3 w-full  ">


                    {post.map((item,) => {

                        return (
                            <>

                                <img key={item._id} class="  block bg-center bg-no-repeat bg-cover h-40 w-full rounded-lg cursor-pointer" src={`/images/${item.post.images}`}
                                    onClick={() => getPostDetails(item.post._id)}
                                    alt='' />

                            </>

                        )
                    })
                    }
                </div>

            </div>



            {detailModal && <Postmodal details={postDetails} detailModal={detailModal} setDetailModal={setDetailModal} />}



            {followingModal && <div id="popup-modal" class=" mx-auto  fixed top-0 right-0 left-0 z-50  bg-slate-700 bg-opacity-50 md:h-full mt-14   justify-center items-center" >
                <div class="relative mx-auto mt-3  max-w-sm h-full ">
                    <div class="relative bg-white h-fit rounded-lg shadow mt-56 ">
                        <button onClick={() => {
                            setFollowingModal(false)

                        }} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-4 text-center">
                            <div>
                                <h1 className='font-bold mb-2'>Following</h1>
                                <hr />
                                <div className='h-full max-h-80 overflow-y-scroll'>
                                    {
                                        following.map((followinglist, index) => (

                                            <div className='flex h-16 cursor-pointer w-full' >

                                                <div class="my-auto p-2" >
                                                    <img src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw=&w=1000&q=80" class="rounded-full w-10 h-10" alt="profile picture" srcset="" />
                                                </div>
                                                <h1 className='my-auto ml-2 text-lg'>{followinglist.name}</h1>
                                                <div className='my-auto ml-auto'>

                                                    {/* {followinglist._id == user.id ? followinglist._id=== <button className='bg-white border px-4 py-1 rounded-2xl mr-auto shadow-lg hover:shadow' onClick={handleFriendShip}>Following</button>
                                                        : <button className='bg-white border border-gray-500 px-4 py-1 rounded-2xl mr-auto shadow-lg hover:shadow' onClick={handleFriendShip}>Follow</button>
                                                    } */}

                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>}




            {followersModal &&

                <div id="popup-modal" class=" mx-auto  fixed top-0 right-0 left-0 z-50  bg-slate-700 bg-opacity-50 md:h-full mt-14   justify-center items-center" >
                    <div class="relative mx-auto mt-3  max-w-sm h-full ">
                        <div class="relative bg-white h-fit rounded-lg shadow mt-56 ">
                            <button onClick={() => {
                                setFollowersModal(false)

                            }} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                            <div class="p-4 text-center">
                                <div>
                                    <h1 className='font-bold mb-2'>Followers</h1>
                                    <hr />
                                    <div className='h-full max-h-80 overflow-y-scroll'>
                                        {
                                            followers.map((followinglist, index) => (

                                                <div className='flex h-16 cursor-pointer w-full' >

                                                    <div class="my-auto p-2" >
                                                        <img src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw=&w=1000&q=80" class="rounded-full w-10 h-10" alt="profile picture" srcset="" />
                                                    </div>
                                                    <h1 className='my-auto ml-2 text-lg'>{followinglist.name}</h1>
                                                    <div className='my-auto ml-auto'>

                                                        {/* {followinglist._id == user.id ? followinglist._id=== <button className='bg-white border px-4 py-1 rounded-2xl mr-auto shadow-lg hover:shadow' onClick={handleFriendShip}>Following</button>
                                                        : <button className='bg-white border border-gray-500 px-4 py-1 rounded-2xl mr-auto shadow-lg hover:shadow' onClick={handleFriendShip}>Follow</button>
                                                    } */}

                                                    </div>

                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                
                }


        </div>
    )
}

export default Profile
