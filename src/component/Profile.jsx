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

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-4 py-10'>
        <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center'>
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
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-4 py-10'>
      <div className='w-full max-w-2xl mx-auto'>

        {/* Card */}
        <div className='bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden'>

          {/* Cover Banner */}
          <div className='h-32 sm:h-40 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 relative'>
            <div className='absolute inset-0 opacity-20' style={{
              backgroundImage: 'radial-gradient(circle at 20% 30%, white 0%, transparent 8%), radial-gradient(circle at 80% 60%, white 0%, transparent 6%), radial-gradient(circle at 50% 80%, white 0%, transparent 5%)'
            }}></div>
          </div>

          {/* Profile Content */}
          <div className='px-6 sm:px-10 pb-8'>

            {/* Avatar overlapping banner */}
            <div className='flex justify-between items-end -mt-12 mb-4'>
              <div className='w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white'>
                {getInitials(user.name)}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition shadow-sm mb-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className='hidden sm:inline'>Logout</span>
              </button>
            </div>

            {/* Name + Role */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {user.name}
            </h1>
            <div className='flex items-center gap-2 mt-2 mb-6'>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                user.role === "admin"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-indigo-50 text-indigo-600"
              }`}>
                <span className='w-1.5 h-1.5 rounded-full bg-current'></span>
                {user.role === "admin" ? "Administrator" : "Student"}
              </span>
              <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600'>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-500'></span>
                Active
              </span>
            </div>

            {/* Divider */}
            <div className='border-t border-gray-100 my-6'></div>

            {/* Details Grid */}
            <h2 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4'>Contact Information</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8'>

              <div className='flex items-center gap-3 bg-gray-50 rounded-xl p-4'>
                <div className='w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className='min-w-0'>
                  <p className='text-xs text-gray-400 mb-0.5'>Email Address</p>
                  <p className='text-sm font-medium text-gray-700 truncate'>{user.email}</p>
                </div>
              </div>

              {user.phone && (
                <div className='flex items-center gap-3 bg-gray-50 rounded-xl p-4'>
                  <div className='w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className='text-xs text-gray-400 mb-0.5'>Phone Number</p>
                    <p className='text-sm font-medium text-gray-700'>{user.phone}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info banner */}
            <div className='flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl p-4 border border-indigo-100'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className='text-sm text-gray-600'>You're securely logged in to your account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile