import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
  return (
        <div className='flex flex-col bg-gray-100 max-w-md mx-auto p-6 rounded-lg shadow-lg'>

            <form className='space-y-5'>
                
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                </label>

                <input
                    type="email"
                    placeholder='Enter Email'

                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                </label>
                <input
                    type='password'
                    placeholder='Enter password'
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button onClick={()=>navigate('/')} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
      Login
    </button>

            </form>

        </div>
  )
}

export default Login