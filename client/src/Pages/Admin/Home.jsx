import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


import Sidebar from '../../Components/Admin/Sidebar'



function Home() {

    const navigate = useNavigate()
    useEffect(() => {

        navigate('home')
      }, [])
    return (
        <div>
            <Sidebar />
        </div>
    )
}

export default Home