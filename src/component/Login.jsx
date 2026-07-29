import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/authApi'

const Login = () => {
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [loginError, setLoginError] = useState("")

    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setLoginInput({ ...loginInput, [name]: value })
    }

    const validate = () => {
        const newErrors = {}
        if (!loginInput.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(loginInput.email)) {
            newErrors.email = "Please enter a valid email"
        }
        if (!loginInput.password) {
            newErrors.password = "Password is required"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoginError("")

        const isValid = validate()
        if (!isValid) return;

        setLoading(true)
        try {
            const response = await loginUser(loginInput)
            const user = response.data.user
            localStorage.setItem("user", JSON.stringify(user))

            if (user.role === "admin") {
                navigate('/users')
            } else {
                navigate('/home')
            }

        } catch (error) {
            console.log(error)
            setLoginError("Incorrect email or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 px-4 py-10'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>

                {/* Header */}
                <div className='text-center mb-8'>
                    <div className='w-14 h-14 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-800'>
                        Welcome Back
                    </h1>
                    <p className='text-sm text-gray-500 mt-1'>
                        Login to continue to your account
                    </p>
                </div>

              
                {loginError && (
                    <div className='mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg text-center'>
                        {loginError}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-4">

               
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            name='email'
                            value={loginInput.email}
                            onChange={onChangeHandler}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            value={loginInput.password}
                            onChange={onChangeHandler}
                            placeholder='Enter your password'
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    
                    <p className='text-center text-sm text-gray-500 pt-2'>
                        Don't have an account?{" "}
                        <a href="/register" className='text-blue-600 font-medium hover:underline'>
                            Register here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login