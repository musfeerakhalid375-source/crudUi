import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))

  const getInitials = (name) => {
    if (!name) return "U"
    return name.trim().split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-4 py-10'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden'>

        {/* Decorative gradient blob */}
        <div className='absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-indigo-400 to-violet-400 rounded-full opacity-10'></div>

        {user ? (
          <div className='text-center relative'>

            {/* Avatar */}
            <div className='w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-200'>
              {getInitials(user.name)}
            </div>

            {/* Name + Role */}
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {user.name}
            </h1>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 mb-6">
              {user.role === "admin" ? "Administrator" : "Student"}
            </span>

            {/* Details */}
            <div className='space-y-3 text-left bg-gray-50 rounded-xl p-4 mb-6'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className='min-w-0'>
                  <p className='text-xs text-gray-400'>Email</p>
                  <p className='text-sm text-gray-700 truncate'>{user.email}</p>
                </div>
              </div>

              {user.phone && (
                <div className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className='text-xs text-gray-400'>Phone</p>
                    <p className='text-sm text-gray-700'>{user.phone}</p>
                  </div>
                </div>
              )}
            </div>

            <p className='text-sm text-gray-400 mb-6'>
              You're successfully logged in 👋
            </p>

            <button
              onClick={handleLogout}
              className="w-full bg-red-50 text-red-600 border border-red-200 py-2.5 rounded-lg font-medium hover:bg-red-100 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='text-center relative'>
            <div className='w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h1>
            <p className='text-gray-500 mb-6'>Please log in to continue.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-violet-700 transition shadow-lg shadow-indigo-200"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile