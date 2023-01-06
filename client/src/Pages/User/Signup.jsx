import React,{useEffect} from 'react'
import SignupComponent from '../../Components/User/Signup'
import {useNavigate} from 'react-router-dom'

function Signup() {

  const navigate = useNavigate()

//   useEffect(()=>{
//     let user  = localStorage.getItem('usertoken')
//     if(user) navigate('/home')
//     else navigate('/signup')      
// },[])


  return (
    <div>
    <SignupComponent/>
         
    </div>
  )
}

export default Signup