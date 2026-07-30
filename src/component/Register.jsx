import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { registerUser, updateUser, getUsers, getUserById } from '../api/authApi';

const Register = () => {
    const [inputRegister, setInputRegister] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const [errors, setError] = useState({})
    const [loading, setLoading] = useState(false);

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            fetchUserData()
        }
    }, [id])

    const fetchUserData = async () => {
        try {
            const response = await getUserById(id)
            const user = response.data.user

            setInputRegister({
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: ""
            })
        } catch (error) {
            console.log(error)
        }
    }

    const validate = () => {
        const newError = {}
        if (!inputRegister.name) {
            newError.name = "Username is required"
        } else if (!/^[A-Za-z\s]+$/.test(inputRegister.name)) {
            newError.name = "Name should only contain letters and spaces";
        }

        if (!inputRegister.email) {
            newError.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(inputRegister.email)) {
            newError.email = "Please enter a valid email"
        }

        if (!id) {
            if (!inputRegister.password) {
                newError.password = "Password is required"
            } else if (inputRegister.password.length < 6) {
                newError.password = "Password must be at least 6 characters";
            }
        }

        if (!inputRegister.phone) {
            newError.phone = "Phone number is required"
        } else if (inputRegister.phone.length !== 11) {
            newError.phone = "Please enter a correct 11-digit phone number";
        }

        setError(newError)
        return Object.keys(newError).length === 0;
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputRegister({ ...inputRegister, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const isValid = validate()
        if (!isValid) return;

        setLoading(true)
        try {
            if (id) {
                await updateUser(id, inputRegister)
            } else {
                await registerUser(inputRegister)
            }

            setInputRegister({ name: "", email: "", password: "", phone: "" });
            navigate("/login")

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-4 py-10'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative overflow-hidden'>

                {/* Decorative gradient blob */}
                <div className='absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-indigo-400 to-violet-400 rounded-full opacity-10'></div>

                {/* Header */}
                <div className='text-center mb-8 relative'>
                    <div className='w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
                        </svg>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-800'>
                        {id ? "Update Your Profile" : "Create an Account"}
                    </h1>
                    <p className='text-sm text-gray-500 mt-1'>
                        {id ? "Update your account details below" : "Join Contact App today"}
                    </p>
                </div>

                <form onSubmit={submitHandler} className="space-y-4 relative">

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <div className='relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <input
                                type="text"
                                placeholder='Enter your name'
                                name='name'
                                value={inputRegister.name}
                                onChange={onChangeHandler}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                    </div>

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
                                value={inputRegister.email}
                                onChange={onChangeHandler}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <div className='relative'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <input
                                type='text'
                                placeholder='Enter your phone number'
                                name='phone'
                                value={inputRegister.phone}
                                onChange={onChangeHandler}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
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
                                value={inputRegister.password}
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
                        type='submit'
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-violet-700 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed mt-2 shadow-lg shadow-indigo-200"
                    >
                        {loading
                            ? "Please wait..."
                            : id ? "Update User" : "Register User"}
                    </button>

                    {/* Login Link */}
                    <p className='text-center text-sm text-gray-500 pt-2'>
                        Already have an account?{" "}
                        <a onClick={()=>navigate('/login')} className='text-indigo-600 font-medium hover:underline'>
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register