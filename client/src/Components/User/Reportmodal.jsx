import React, { useState } from 'react'
import { AiOutlineDoubleRight } from "react-icons/ai";
import axios from '../../Axios'

function Reportmodal({ setReportModal, postId,userId }) {


    console.log('post id checking on report modal  ', postId)

    

    const report = (type) => {
         
        axios.post('/report',{type,postId,userId}).then((response)=>{

        })

        .catch((er)=>{
            console.log(er)
        })
    }

    return (


        <>


            <div id="popup-modal" tabindex="-1" class="overflow-y-auto fixed top-0 right-0 left-0 backdrop-blur-sm z-30 md:inset-0 h-modal  md:h-full justify-center items-center" aria-hidden="true">
                <div className="relative mx-auto mt-36 w-full max-w-sm h-full md:h-auto">

                    <div className="relative bg-white border-2  m-2 rounded-lg shadow-md ">
                        <h1 className='mt-4 ml-2'>Why are you reporting this post?</h1>
                        <div className='flex justify-between'>
                            <h1 className='mt-7 ml-2 text-red-500 text-base   px-auto cursor-pointer'
                            >it's spam
                            </h1>
                            <p className='mt-6 mr-3 cursor-pointer '
                                onClick={() => report('spam')}
                            >
                                <AiOutlineDoubleRight />
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='mt-7 ml-2 text-red-500 text-base   px-auto cursor-pointer'
                            >bullying and harrasment
                            </h1>
                            <p className='mt-7 mr-3'
                                onClick={() => report('bullying and harrasment')}

                            >
                                <AiOutlineDoubleRight />
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='mt-7 ml-2 text-red-500 text-base   px-auto cursor-pointer'
                            >scam and fraud
                            </h1>
                            <p className='mt-7 mr-3'
                                onClick={() => report('scam and fraud')}

                            >

                                <AiOutlineDoubleRight />
                            </p>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='mt-7 ml-2 text-red-500 text-base   px-auto cursor-pointer'
                            >i don't like it
                            </h1>
                            <p className='mt-7 mr-3'
                                onClick={() => report('i dont like it')}

                            >
                                <AiOutlineDoubleRight />
                            </p>
                        </div>


                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center
                             dark:hover:bg-gray-800 dark:hover:text-white"
                            data-modal-toggle="popup-modal"
                            onClick={() => setReportModal(false)}
                        >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>

                        <div class="p-6  w-full"></div>

                    </div>
                </div>
            </div>

        </>



    )
}

export default Reportmodal





