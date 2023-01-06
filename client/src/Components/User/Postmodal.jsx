import React, { useEffect, useState,useContext } from 'react'
import axios from '../../Axios'
import {format} from 'timeago.js'
import { CgClose } from "react-icons/cg";
import { ErrorContext } from '../../Utilities/Context';
import { useNavigate } from 'react-router-dom';

function Postmodal({ details,detailModal,setDetailModal }) {

     const {setErrors} = useContext(ErrorContext)
       const navigate = useNavigate()
    const [comments, setComments] = useState([])
    useEffect(() => {

        axios.get('/comment/' + details[0].post._id).then((response) => {
            console.log('comment ', response.data.response)

            setComments(response.data.response)
        })
            .catch((er) => {
                console.log(er)
                setErrors(er.response)
                navigate('/error')
            })
    }, [])

    // console.log('ffffffff    ', details[0].post)


    return (
        <>

            <div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                < CgClose className='right-8 top-5 absolute h-10 w-12 text-gray-100 cursor-pointer'
                onClick={()=>{setDetailModal(!detailModal)}}
                />
                <div className=' w-11/12 md:w-10/12 lg:w-7/12 flex h-[60%] lg:h-[70%]'>
                    <div className='hidden md:block w-1/2'>
                        <img alt='#jhkjkj' className='w-auto h-full object-fill  ml-auto' src={`/images/${details[0].post.images}`}/>
                    </div>

                    <div class=" w-full md:w-1/2 h-full bg-white  text-center">
                        <div className="p-2 w-full h-[10%] rounded-md flex">
                            <div className=" my-auto text-lg font-semibold">Comments</div>
                        </div>
                        <div className=' border border-y-10 w-full mx-auto h-[80%] overflow-y-scroll scrollbar-hide'>


                            <div className='m-2 '>

                                {
                                    comments.map((comment) => {
                                  
                                        return(

                                        <>
                                            <div className=" w-fit flex h-fit rounded-md ">
                                                <div className=" rounded-full  p-[2px] ">
                                                    <img alt='#' className='rounded-full object-cover h-8 w-8 ring-2' src={`/images/${comment.profilepic[0]}`}></img>
                                                </div>
                                                <div className=" text-base text-gray-900 h-full my-auto mx-2 font-semibold text-start ">{comment.user[0]}</div>
                                            </div>

                                            <div className='mx-8 rounded-md '>
                                                <div className='  rounded-md  ml-5 text-left text-sm text-gray-900 w-auto '>{comment.comment}</div>
                             
                                                <div className=" text-xs -mt-1 text-gray-500 font-mono text-end">{format(comment.time)}</div>
                                            </div>
                                            <hr className='mb-2' />
                                        </>

                                        )
                                    })

                                }
                            </div>



                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default Postmodal