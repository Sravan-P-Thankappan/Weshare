import React, { useContext, useEffect, useState, useRef } from 'react'
import { useOutletContext, useNavigate } from "react-router-dom";
import { BsChat, BsSave, BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineSend, AiFillHeart } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ModalContext } from '../../Utilities/Context'
import Addpost from './Addpost';
import axios from '../../Axios'
import { UserContext } from '../../Utilities/Context';
import { ErrorContext } from '../../Utilities/Context';
import Reportmodal from './Reportmodal';

import { format } from 'timeago.js'

function Hero() {

    const navigate = useNavigate()
    const socket = useOutletContext();
    const { showmodal } = useContext(ModalContext)
    const [posts, setPosts] = useState([])
    const [comment, setComment] = useState('')
    const [postcomment, setPostComment] = useState([])
    const { user } = useContext(UserContext)
    const [commentmodal, setCommentModal] = useState(false)
    const [temp, setTemp] = useState()
    const commentField = useRef(null)
    const [reportModal, setReportModal] = useState(false)
    const [postId, setPostId] = useState(null)

    const { setErrors } = useContext(ErrorContext)

    const [dorpDown, setDropdown] = useState({ status: false, id: null })

    //---------configuration setup for passing token in header----------

    const token = localStorage.getItem('usertoken')

    const config = {
        headers: {
            'token': token
        }
    }


    //-------------get all post-----------------

    const getAllPost = () => {
        axios.get('/post').then((response) => {

            const { data } = response

            setPosts(data)

        }).catch((er) => {

            setErrors(er.response)
            navigate('/error')

        })
    }

    //--------------get all users-----------------

    useEffect(() => {

        getAllPost()

    }, [])


    //----------------handle notification---------------

    const handleNotification = (recieverId, type) => {

        socket?.emit('sendNotification', {
            senderName: user.name,
            recieverName: recieverId,
            type
        })
    }



    //-------------like post-----------------
    const handleLike = (postId, userId, recieverId, type) => {

        let data = {
            userId,
            postId
        }
        axios.post('/likepost', data, config).then((response) => {

            console.log('like response checkingggg   ', response.data)


            handleNotification(recieverId, type)
            getAllPost()

        })
            .catch((er) => {


                setErrors(er.response)
                navigate('/error')
            })
    }


    //----------------comment post------------------ 

    const handleComment = (e, postId, userId, recieverId, type) => {

        e.preventDefault()

        let data = {
            comment, postId, userId
        }
        axios.post('/comment', data, config).then((response) => {

            handleNotification(recieverId, type)
            e.target.reset()


        })
            .catch((er) => {
                console.log(er);

                setErrors(er.response)
                navigate('/error')
            })
    }


    //---------------handle individual comment---------------



    const handleIndividualComment = (postId) => {
        setTemp(postId)
        axios.get('/comment/' + postId, config).then((res) => {

            const { data: { response } } = res

            console.log(response);

            setPostComment(response)
            setCommentModal(!commentmodal)


        }).catch((er) => {

            console.log(er);
            setErrors(er.response)
            navigate('/error')

        })

    }



    const handleReport = (postId) => {

        console.log('post id checkingggg ', postId)

        setReportModal(true)
        setPostId(postId)

    }

    const handleDropdown = (id) => {

        setDropdown({ ...dorpDown, status: !dorpDown.status, id })
    }



    return (

        <>

            <div className=' w-full flex gap-12 h-auto max-h-screen justify-center ' >



                <div className=' w-full  max-h-3/6 overflow-y-scroll scrollbar-hide  flex flex-col gap-3 sm:w-10/12 md:w-8/12  lg:w-5/12 rounded-md  '>

                    {
                        posts.map((post, index) => {

                            return (
                                < div className='mb-3 p-4 rounded-md bg-white' key={post.postId} >
                                    <div className='flex justify-between'>


                                        <div className='flex  flex-col w-full '>

                                            <div className='flex gap-2'>
                                                <span><img className=' inline-block rounded-full w-12 h-12 ring-2' src={`/images/${post.profile}`} alt="" /></span><h3 className='mt-2'>{post.user}</h3>
                                            </div>
                                            <p className='-mt-4 ml-14  text-xs'>{format(post.time)}</p>

                                        </div>

                                        <div className='mt-3 cursor-pointer relative ' >
                                            <h1><BsThreeDots onClick={() => handleDropdown(post.postId)} /></h1>

                                            {
                                            dorpDown.status===true && dorpDown.id === post.postId &&
                                                <div className='absolute top-3 py-3 w-20 right-0 h-15 bg-slate-200 shadow-lg rounded'>

                                                    <p className='text-center text-red-500' onClick={() => handleReport(post.postId)}>Report</p>

                                                </div>
                                            }

                                        </div>



                                    </div>

                                    <div className='mt-3'>
                                        <img className='  w-auto object-cover h-auto  rounded-md' src={`/images/${post.image}`} alt="image" />

                                    </div>

                                    <div className='flex justify-between mt-3'>
                                        <div className='ml-2 flex gap-7'>


                                            {post.like.includes(user.id) ? <li className='list-none cursor-pointer '
                                                onClick={() => handleLike(post.postId, user.id)}>
                                                <AiFillHeart style={{ color: '#ee1d52' }} size={20} />
                                            </li>

                                                : <li className='list-none cursor-pointer '
                                                    onClick={() => handleLike(post.postId, user.id, post.user, 1)}>
                                                    <AiOutlineHeart size={20} />
                                                </li>}


                                            <li className='list-none cursor-pointer'
                                                onClick={() => handleIndividualComment(post.postId)}
                                            >
                                                <BsChat size={17} />
                                            </li>
                                        </div>



                                        <div className='mr-2'>
                                            <li className='list-none cursor-pointer '><BsSave /></li>
                                        </div>

                                    </div>

                                    <div className='space-y-1 px-1'>
                                        <p>liked by {post.likes} people</p>
                                        <p>{post.description}</p>
                                        <p className='cursor-pointer'>view all comment</p>

                                        <div className='relative'>
                                            <form onSubmit={(e) => handleComment(e, post.postId, user.id, post.user, 2)} >
                                                <div className='rounded-full  bg-slate-200 px-5 pr-7 '>
                                                    <input className=' w-full bg-transparent  outline-none rounded-2xl p-2'
                                                        name='comment'
                                                        ref={commentField}
                                                        type="text"
                                                        placeholder='Add Your Comment'
                                                        onChange={(e) => setComment(e.target.value)}
                                                    />
                                                    <button className='absolute mt-3 ' type='submit'><AiOutlineSend /></button>
                                                </div>
                                            </form>
                                        </div>


                                    </div>
                                </div>

                            )
                        })

                    }


                    {/* </div > */}
                </div>



                <div className='hidden lg:block h-fit bg-white shadow-lg   lg:w-3/12 p-3 rounded-lg '>
                    <div className='flex justify-evenly'>

                        <div className='flex flex-col gap-3 '>
                            <div className='w-12 rounded-full'>
                                <img className='  rounded-full object-cover  ring-2' src="https://media.istockphoto.com/id/638756792/photo/beautiful-woman-posing-against-dark-background.jpg?s=612x612&w=0&k=20&c=AanwEr0pmrS-zhkVJEgAwxHKwnx14ywNh5dmzwbpyLk=" alt="" />
                            </div>
                            <div className='w-12 rounded-full'>
                                <img className='  rounded-full object-cover  ring-2' src="https://media.istockphoto.com/id/638756792/photo/beautiful-woman-posing-against-dark-background.jpg?s=612x612&w=0&k=20&c=AanwEr0pmrS-zhkVJEgAwxHKwnx14ywNh5dmzwbpyLk=" alt="" />
                            </div>
                            <div className='w-12 rounded-full'>
                                <img className='  rounded-full object-cover  ring-2' src="https://media.istockphoto.com/id/638756792/photo/beautiful-woman-posing-against-dark-background.jpg?s=612x612&w=0&k=20&c=AanwEr0pmrS-zhkVJEgAwxHKwnx14ywNh5dmzwbpyLk=" alt="" />
                            </div>

                        </div>

                        <div className=' flex w-full justify-evenly'>

                            <div className='space-y-9'>
                                <p className='mt-3 ml-10'>Ann</p>
                                <p className='mt-3 ml-10'>Ann</p>
                                <p className='mt-3 ml-10'>Ann</p>

                            </div>

                            <div className='space-y-8 flex flex-col '>

                                <button className='mt-3 ml-10 cursor-pointer bg-[#0066ff] text-slate-200 rounded-md text-sm px-3 py-1'>Follow</button>
                                <button className='mt-3 ml-10 cursor-pointer bg-[#0066ff] text-slate-200 rounded-md text-sm px-3 py-1'>Follow</button>
                                <button className='mt-3 ml-10 cursor-pointer bg-[#0066ff] text-slate-200 rounded-md text-sm px-3 py-1'>Follow</button>

                            </div>



                        </div>
                    </div>

                    <p className='text-center p-2 ml-5  text-blue-400'>See All</p>
                </div>

            </div >




            {
                showmodal && <Addpost />

            }


            {
                reportModal && <Reportmodal setReportModal={setReportModal} postId={postId} userId={user.id} />
            }

            <>

                {commentmodal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto sm:w-5/12 my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-xl font-semibold">
                                            Comments
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 t float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setCommentModal(false)}
                                        >
                                            <span className="bg-transparent  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                <IoCloseCircleOutline style={{ color: 'gray' }} size={30} />
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}

                                    {postcomment.map((comment) => {


                                        return (

                                            <div className="relative p-6 flex gap-2 ">
                                                <div>
                                                    <div className='w-8 rounded-full'>
                                                        <img className='  rounded-full object-cover h-8 mt-0 w-10 ring-2' src={`/images/${comment.profilepic[0]}`} alt="" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className='text-base'>{comment.user[0]}</span>
                                                    <span className='text-xs text-slate-500 ml-3 '>{format(comment.time)}</span>
                                                    <h1 className='text-sm mt-0'>{comment.comment}</h1>
                                                </div>

                                            </div>
                                        )

                                    })}



                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>





        </>
    )

}





export default Hero