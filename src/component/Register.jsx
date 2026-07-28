import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { registerUser, updateUser , getUsers , getUserById } from '../api/authApi';

const Register = () => {
    const [inputRegister, setInputRegister] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const [errors, setError] = useState({})
        const [editId, setEditId] = useState(null);

    const { id } = useParams()  

  
    useEffect(() => {
        if (id) {
            fetchUserData()
        }
    }, [id])

    const fetchUserData = async () => {
        try {
            const response = await getUserById(id)
                    console.log("Fetched user:", response.data) 

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
        if (!inputRegister.name) newError.name = "username is require"
        if (!inputRegister.email) {
            newError.email = "email is require"
        } else if (!/\S+@\S+\.\S+/.test(inputRegister.email)) {
            newError.email = "please enter valid email"
        }

       
        if (!id) {
            if (!inputRegister.password) {
                newError.password = "password is require"
            } else if (inputRegister.password.length < 6) {
                newError.password = "Password must be at least 6 characters";
            }
        }

        if (!inputRegister.phone) {
            newError.phone = "phone number is require"
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

        try {
            if (id) {
                
                await updateUser(id, inputRegister)
                
            } else {
                // jab users register ho gha 
                await registerUser(inputRegister)
            }

            setInputRegister({ name: "", email: "", password: "", phone: "" });
            navigate("/users")
          
        } catch (error) {
            console.log(error)
        }
    }

       const navigate = useNavigate()


    return (
        <div className='flex flex-col bg-gray-100 max-w-md mx-auto p-6 rounded-lg shadow-lg'>
            <form onSubmit={submitHandler} className="space-y-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        placeholder='Enter Your Name'
                        name='name'
                        value={inputRegister.name}
                        onChange={onChangeHandler}

                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>

                    <input
                        type="email"
                        placeholder='Enter Email'
                        name='email'
                        value={inputRegister.email}
                        onChange={onChangeHandler}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone No.
                    </label>
                    <input
                        type='phone'
                        placeholder='Enter Phone Number'
                        name='phone'
                        value={inputRegister.phone}
                        onChange={onChangeHandler}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                        </p>
                    )}
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type='password'
                        placeholder='Enter password'
                        name='password'
                        value={inputRegister.password}
                        onChange={onChangeHandler}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </p>
                    )}
                    <button
                        type='submit'
                       
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        {editId ? "Update User" : "Register User"}
                    </button>

                </form>
        </div>
    )
}

export default Register