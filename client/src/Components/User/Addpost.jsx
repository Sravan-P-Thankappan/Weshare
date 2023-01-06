
import React, { useContext, useState } from "react"
import { ModalContext } from '../../Utilities/Context'
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from '../../Axios'
import {UserContext,ErrorContext} from '../../Utilities/Context'
import { useNavigate } from "react-router-dom";



function Addpost() {
      
    
    const navigate = useNavigate()
    const {setErrors} = useContext(ErrorContext)

    const { showmodal, setShowModal } = useContext(ModalContext)
    const{user} = useContext(UserContext)
    const [image, setImage] = useState()
    const[description,setDescription] = useState() 
    const [file,setFile] = useState()



    // ---------handle Image------------

    const handleImage = (e) => {
         
        setFile(e.target.files[0])
        
        setImage(URL.createObjectURL(e.target.files[0]))
    }

  


    //--------------handle Post-----------------
    const handlePost = (e)=>{
        
        e.preventDefault()

        console.log('handlepost');
          
        const formData = new FormData()

        formData.append('image',file)
        formData.append('description',description)
        formData.append('user',user.id)
  
        const token = localStorage.getItem('usertoken')

        const config = {
           headers:{
              'token':token 
           }
        } 


        axios.post('/post',formData, config).then(()=>{

            setShowModal(!setShowModal)
               console.log('success add post');
        }).catch((er)=>{
            console.log(er);
            setErrors(er.response)
            navigate('/error')
        })

   
    }





    return (

        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-full sm:w-1/2  my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-end p-5 border-b border-solid border-slate-200 rounded-t">

                            <div>
                                <IoCloseCircleOutline className="cursor-pointer" onClick={() => setShowModal(!showmodal)} style={{ color: 'gray' }} size={30} />
                            </div>

                        </div>


                        <form onSubmit={handlePost}  encType='multipart/form-data'>
                            <div className="relative p-6 flex-auto ">

                                <label htmlFor="Description">Description</label>

                                <textarea className="w-full mt-2 rounded-md outline-none bg-slate-100 shadow-lg" 
                                placeholder="" 
                                name="description" id="" 
                                cols="15" rows="2"
                                onChange={(e)=>setDescription(e.target.value)}
                                ></textarea>

                                {image&&<div className="h-1/4 flex justify-center">
                                    <img className="object-cover h-96 w-full outline-none"  src={image} alt="" />
                                </div>}

                                <div className="flex justify-center mt-3">

                                    <input className="w-full " type="file" name="image" id="actual-btn" hidden onChange={handleImage} />

                                    <label className="text-center bg-teal-500 p-1 rounded-md text-white cursor-pointer" htmlFor="actual-btn">Choose File</label>

                                </div>

                            </div>
                            
                            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">

                                <button
                                    className="bg-blue-700 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Add Post
                                </button>
                            </div>

                        </form>




                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>

    )
}

export default Addpost






