import React,{useContext} from 'react'
import { GrHomeRounded } from "react-icons/gr";
import { IoNotificationsOutline, IoAddCircleOutline } from "react-icons/io5";
import { TbMessageCircle } from "react-icons/tb";
import { Link } from 'react-router-dom'
import { ModalContext } from '../../Utilities/Context'

function Mobilenavbar() {

    const { showmodal, setShowModal } = useContext(ModalContext)

    return (


        <div className='flex items-end'>

            <div className='w-full bg-slate-200 shadow-lg'>
                <div className='flex list-none justify-around py-1'>
                    <Link to={'feed'}>
                        <li className='mt-1'><GrHomeRounded /></li>
                    </Link>
                    <Link to={'chat'}>
                        <li className='mt-1'><TbMessageCircle size={20} /></li>

                    </Link>

                   
                        <li className='mt-1' onClick={()=>setShowModal(!showmodal)}><IoAddCircleOutline size={20} /></li>

                  
                    <Link >
                        <li className='mt-1'><IoNotificationsOutline size={20} /></li>

                    </Link>
                    <Link to={'profile'}>
                        <li className='mb-1'>
                            <img className='cursor-pointer inline-block rounded-full w-5 h-5 ring-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOS3dPYiojADd7mMIZxhxNpQOZuZ_5HtcQj7AsaH3S&s" alt="" />
                        </li>

                    </Link>

                </div>
            </div>

        </div>
    )
}

export default Mobilenavbar