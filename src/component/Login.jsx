import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
                navigate('/profile')
            }

        } catch (error) {
            console.log(error)
            setLoginError("Incorrect email or password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-4 py-10'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden'>

                {/* Decorative gradient blob */}
                <div className='absolute -top-16 -left-16 w-40 h-40 bg-gradient-to-br from-violet-400 to-indigo-400 rounded-full opacity-10'></div>

                {/* Header */}
                <div className='text-center mb-8 relative'>
                    <div className='w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
                        </svg>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-800'>
                        Welcome Back
                    </h1>
                    <p className='text-sm text-gray-500 mt-1'>
                        Login to continue to Contact App
                    </p>
                </div>

                {loginError && (
                    <div className='mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg text-center relative'>
                        {loginError}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-4 relative">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className='relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="email"
                                placeholder='Enter your email'
                                name='email'
                                value={loginInput.email}
                                onChange={onChangeHandler}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className='relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <input
                                type='password'
                                name='password'
                                value={loginInput.password}
                                onChange={onChangeHandler}
                                placeholder='Enter your password'
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-violet-700 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed mt-2 shadow-lg shadow-indigo-200">
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    {/* Register Link */}
                    <p className='text-center text-sm text-gray-500 pt-2'>
                        Don't have an account?{" "}
                        <Link href="/register" className='text-indigo-600 font-medium hover:underline'>
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login