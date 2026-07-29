import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
}
    return (
        <div>
           <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
  {/* Logo */}
  <div>
    <h1 onClick={()=>navigate('/')} className="text-3xl font-bold text-blue-600">
      Contact APP
    </h1>
  </div>

  {/* Buttons */}
  <div className="flex items-center gap-4">
    <button onClick={()=>navigate('/register')} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
      Register
    </button>

    <button onClick={()=>navigate('/login')} className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300">
      Login
    </button>
    <button onClick={handleLogout} className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300">
      logOut
    </button>
  </div>
</nav>
        </div>
    )
}

export default Navbar