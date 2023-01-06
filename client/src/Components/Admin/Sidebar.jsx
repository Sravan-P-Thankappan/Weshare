import { useState } from "react";
import { Link, Outlet,useNavigate } from 'react-router-dom'
import { BsArrowRightCircle } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiPhotoAlbum } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";


const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate()
  const Menus = [
    { title: "Dashboard", src: <MdOutlineSpaceDashboard size={25} />, route: 'home' },
    { title: "User", src: <FiUsers size={25} />, route: 'users' },
    { title: "Post", src: <BiPhotoAlbum size={25} />, route:'post', gap: true },
    // { title: "Logout", src: <AiOutlineLogout size={25} />, },

  ];

 const handleLogout = ()=>{
    
  localStorage.removeItem('admintoken')
           navigate('/admin')
 }

  return (
    <div className="flex">
      <div
        className={` ${open ? "w-72" : "w-20 "
          } bg-blue-800 h-screen p-5  pt-8 relative duration-300`}
      >

        <p className={`absolute cursor-pointer -right-0 top-9 w-7 
              ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}>
          <BsArrowRightCircle size={25} style={{ color: '#e2e8f0' }} />
        </p>
        {/* <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        /> */}
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            weShare
          </h1>
        </div>

        <ul className="pt-6">


          {Menus.map((Menu, index) => (
            <Link to={Menu.route}>
              <li

                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                  } `}
              >
                <div>{Menu.src}</div>

                <div className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                  }`}>
                </div>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>

              </li>
            </Link>


          ))}

  

          
        </ul>

        <div  className="text-gray-300 mt-2 ml-2 cursor-pointer" onClick={handleLogout}> <AiOutlineLogout size={25} /></div>

      </div>



      <div className="h-screen flex-1 p-7">
        {/* ---------------------------outlet----------------------------------- */}
        <Outlet />

      </div>

    </div>
  );
};
export default Sidebar;