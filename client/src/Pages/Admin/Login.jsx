import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import LoginComponent from '../../Components/Admin/Login'

function Login() {

const navigate =  useNavigate()

  useEffect(()=>{
    let admin  = localStorage.getItem('admintoken')
    if(admin) navigate('/admin/dashboard')
    else navigate('/admin')      
},[])

  return (
    <div>
       <LoginComponent/>
    </div>
  )
}

export default Login