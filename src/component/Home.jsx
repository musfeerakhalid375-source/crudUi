import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()  

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 px-4'>
      <div className='text-center'>
        <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-blue-600 flex items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome{user?.name ? `, ${user.name}` : ""} 👋
        </h1>
        <p className='text-gray-500 mb-6'>
          You're successfully logged in to your account.
        </p>

        {!user && (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  )
}

export default Home