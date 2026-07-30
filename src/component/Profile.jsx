import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const getInitials = (name) => {
    if (!name) return "U"
    return name.trim().split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
  }

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
        <div className='w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center'>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Welcome</h1>
          <p className='text-sm text-gray-500 mb-6'>Please log in to continue.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-10'>
      <div className='w-full max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8'>

        {/* Avatar + Name */}
        <div className='flex items-center gap-4 mb-6'>
          <div className='w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-semibold shrink-0'>
            {getInitials(user.name)}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{user.name}</h1>
            <p className='text-xs text-gray-400 capitalize'>{user.role === "admin" ? "Administrator" : "Student"}</p>
          </div>
        </div>

        <div className='border-t border-gray-100 my-5'></div>

        {/* Details */}
        <div className='space-y-4'>
          <div>
            <p className='text-xs text-gray-400 mb-0.5'>Email</p>
            <p className='text-sm text-gray-700'>{user.email}</p>
          </div>

          {user.phone && (
            <div>
              <p className='text-xs text-gray-400 mb-0.5'>Phone</p>
              <p className='text-sm text-gray-700'>{user.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile