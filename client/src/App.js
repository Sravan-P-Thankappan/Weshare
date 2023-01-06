
import { Routes, Route } from 'react-router-dom'

// -----------userside components------------
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import Forgot from './Pages/User/Forgot';
import Otp from './Pages/User/Otp';
import Home from "./Pages/User/Home";
import Hero from './Components/User/Hero';
import Profile from './Components/User/Profile';
import { Modal } from './Utilities/Context';
import { User } from './Utilities/Context'
import { Friend } from './Utilities/Context';
import Editprofile from './Components/User/Editprofile';
import Friendprofile from './Components/User/Friendprofile';
import Chat from './Components/User/Chat';
import Notfound from './Pages/Error/Notfound';
import Error from './Pages/Error/Error';
import { Follow } from './Utilities/Context';
import { Errors } from './Utilities/Context';
import jwtDecode from 'jwt-decode';

// import {io} from 'socket.io-client'

// import ProtectedRoutes from './Utilities/ProtectedRoute';



// ------------Adminside component-------------
import AdminLogin from './Pages/Admin/Login'
import Dashboard from './Pages/Admin/Home'
import AdminHome from './Components/Admin/Home'
import Usermanage from './Components/Admin/Usermanagement'
import { useEffect } from 'react';
import Postmanagement from './Components/Admin/Postmanagement';


const socket = require('socket.io-client')("ws://localhost:8900")

function App() {

  const user = localStorage.getItem('usertoken') ? jwtDecode(localStorage.getItem('usertoken')) : ''
  console.log('apppppppppppppp  ', user)
  useEffect(() => {
    socket?.emit('addUser', user?.id)

  }, [user.id])

  return (

    <>
      <div >

        {/* ------------------User Side Route------------------- */}
        <Errors>
          <User>
            <Modal>
              <Friend>
                <Routes>

                  <Route exact path='/' element={<Login />} />

                  <Route path='/forgot' element={<Forgot />} />
                  <Route path='/otp' element={<Otp />} />
                  <Route path='/signup' element={<Signup />} />

                  <Route path='/home' element={<Home />}>

                    <Route path='feed' element={<Hero />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='editprofile' element={<Editprofile />} />
                    <Route path='friendprofile' element={<Friendprofile />} />
                    <Route path='chat' element={<Chat socket={socket} />} />

                  </Route>

                  <Route path='/error' element={<Error />} />


                </Routes>
              </Friend>
            </Modal>
          </User>
          {/* ------------------Admin Side Route------------------- */}

          <Routes>

            <Route path='/admin' element={<AdminLogin />} />

            <Route path='/admin/dashboard' element={<Dashboard />} >
              <Route path='home' element={<AdminHome />} />
              <Route path='users' element={<Usermanage />} />
              <Route path='post' element={<Postmanagement />} />
            </Route>

          </Routes>

         

        </Errors>

      </div>
    </>
  );
}

export default App;
