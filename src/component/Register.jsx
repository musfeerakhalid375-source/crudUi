import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { registerUser, updateUser, getUsers, getUserById } from '../api/authApi';

const Register = () => {
    const [inputRegister, setInputRegister] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const [errors, setError] = useState({})
    const [editId, setEditId] = useState(null);
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
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 px-4 py-10'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8'>

                {/* Header */}
                <div className='text-center mb-8'>
                    <div className='w-14 h-14 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-800'>
                        {id ? "Update Your Profile" : "Create an Account"}
                    </h1>
                    <p className='text-sm text-gray-500 mt-1'>
                        {id ? "Update your account details below" : "Fill in your details to get started"}
                    </p>
                </div>

                <form onSubmit={submitHandler} className="space-y-4">

                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder='Enter your name'
                            name='name'
                            value={inputRegister.name}
                            onChange={onChangeHandler}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                    </div>

                   
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder='Enter your email'
                            name='email'
                            value={inputRegister.email}
                            onChange={onChangeHandler}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <input
                            type='text'
                            placeholder='Enter your phone number'
                            name='phone'
                            value={inputRegister.phone}
                            onChange={onChangeHandler}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            value={inputRegister.password}
                            onChange={onChangeHandler}
                            placeholder='Enter your password'
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                  
                    <button
                        type='submit'
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    >
                        {loading
                            ? "Please wait..."
                            : id ? "Update User" : "Register User"}
                    </button>

                    {/* Login Link */}
                    <p className='text-center text-sm text-gray-500 pt-2'>
                        Already have an account?{" "}
                        <a href="/login" className='text-blue-600 font-medium hover:underline'>
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register