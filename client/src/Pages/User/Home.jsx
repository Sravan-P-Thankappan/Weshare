import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../../Components/User/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Mobilenavbar from '../../Components/User/Mobilenavbar'
import { io } from 'socket.io-client'
import { UserContext } from '../../Utilities/Context'
import axios from '../../Axios'
import { FriendContext } from '../../Utilities/Context';

function Home() {

    const navigate = useNavigate()
    const [socket, setSocket] = useState(null)
    const { user } = useContext(UserContext)
    const [searchmodal, setSearchModal] = useState(false)
    const [searchResult, setSearchResult] = useState([])



    useEffect(() => {
        navigate('feed')
    }, [])


    useEffect(() => {
        setSocket(io("https://weshare.fun",{path:"/notification/socket.io"}))

    }, [])

    useEffect(() => {
        socket?.emit('newUser', user.name)
    }, [socket, user])


    const handleChange = (e) => {

        console.log('handle changeeeeeeee000000000000000000')

        console.log(e.target.value)
        if (e.target.value.length !== 0) {

            setSearchModal(true)
            let result = e.target.value
            axios.get('/usersearch/' + result).then((response) => {

                console.log("search resultttttt", response.data)
                const { data } = response
                setSearchResult(data)
            }).catch((er) => {

            })


        }
        else setSearchModal(false)
    }





    return (

        <>

            <div>


                <div className=' max-h-screen overflow-hidden scrollbar-hide   '>

                    <div className='hidden sm:inline'>

                        <Navbar socket={socket} />
                    </div>



                    <div className='sm:hidden bg-white sticky top-0 h-10 flex  '>
                        <div className='w-4/12 px-3 '>

                            <h3 className='text-2xl text-blue-700 font-bold'>weShare</h3>
                        </div>
                        <div className='w-8/12 p-1.5 px-3 flex justify-end'>
                            <input className=' bg-slate-200 w-8/12 rounded-2xl p-1 pl-2 text-gray-500 focus:text-slate-900 outline-none' type="search"
                                placeholder='search... '

                                // value={inputSearch}
                                onChange={handleChange}
                            />
                        </div>
                    </div>



                    <div className='sm:mt-4'>

                        <Outlet context={socket} />


                    </div>

                </div>



                <div className='sm:hidden sticky bottom-0'>
                    <Mobilenavbar />
                </div>

            </div>


            {searchmodal && <Search user={user} searchResult={searchResult} setSearchModal={setSearchModal} />}





        </>
    )
}

export default Home








const Search = ({user, setSearchModal, searchResult }) => {

    const { setFriend } = useContext(FriendContext)

 const navigate = useNavigate()

    const profile = (userid) => {
        if (userid === user.id) {
            navigate('profile')
        }


        else {

            setFriend(userid)
            navigate('friendprofile')
        }
    }


    return (
        <>

           
            <div className='sm:hidden w-full h-screen bg-slate-700 bg-opacity-50 absolute top-0 left-0 right-0 overflow-hidden' onClick={() => setSearchModal(false)}>

            <div className='w-1/2 h-auto relative '>

                {searchResult.map((user) => {

                    return (
                        <div className='flex h-auto  gap-5 absolute w-full top-10 
               left-28 p-3 rounded bg-white'
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

        </>

    )

}