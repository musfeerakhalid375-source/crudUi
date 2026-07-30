import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const [show, setShow] = useState(false)

  useEffect(() => {
    // halki entrance animation trigger karne ke liye
    const timer = setTimeout(() => setShow(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const getInitials = (name) => {
    if (!name) return "U"
    return name.trim().split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
  }

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-4'>
        <div className='w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center animate-[fadeIn_0.4s_ease-out]'>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">Welcome</h1>
          <p className='text-sm text-gray-500 mb-6'>Please log in to continue.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 px-4 py-10 flex items-center justify-center'>
      <div
        className={`w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transition-all duration-500 ease-out ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >

        {/* Avatar + Name */}
        <div className='flex items-center gap-4 mb-6'>
          <div className='relative shrink-0'>
            <div className='w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xl font-semibold shadow-md shadow-indigo-200 transition-transform duration-300 hover:scale-105'>
              {getInitials(user.name)}
            </div>
            <span className='absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full'></span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{user.name}</h1>
            <span className='inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600'>
              {user.role === "admin" ? "Administrator" : "Student"}
            </span>
          </div>
        </div>

        <div className='border-t border-gray-100 my-5'></div>

        {/* Details */}
        <div className='space-y-1'>
          <div className='flex items-center gap-3 py-3 px-3 rounded-lg transition-colors hover:bg-gray-50 group'>
            <div className='w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 transition-colors group-hover:bg-indigo-100'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className='min-w-0'>
              <p className='text-xs text-gray-400'>Email</p>
              <p className='text-sm font-medium text-gray-700 truncate'>{user.email}</p>
            </div>
          </div>

          {user.phone && (
            <div className='flex items-center gap-3 py-3 px-3 rounded-lg transition-colors hover:bg-gray-50 group'>
              <div className='w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center shrink-0 transition-colors group-hover:bg-violet-100'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className='text-xs text-gray-400'>Phone</p>
                <p className='text-sm font-medium text-gray-700'>{user.phone}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile