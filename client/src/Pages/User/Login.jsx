import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


import LoginComponent from '../../Components/User/Login'

function Login() {


const navigate =  useNavigate()

//   useEffect(()=>{
//     let user  = localStorage.getItem('usertoken')
//     if(user) navigate('/home')
//     else navigate('/')      
// },[])

  return (
    <div>
              
       <LoginComponent/>
       
    </div>
  )
}

export default Login