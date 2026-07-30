import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const features = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
                </svg>
            ),
            title: "Manage Contacts",
            desc: "Add, update, and organize all your contacts in one clean dashboard."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Secure Access",
            desc: "Role-based login system keeps admin and user data safe and separate."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
            ),
            title: "Search & Filter",
            desc: "Quickly find any contact by name or email with instant search."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Fast & Responsive",
            desc: "Built with the MERN stack for a smooth experience on any device."
        },
    ]

    return (
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-100'>

            {/* Hero Section */}
            <div className='max-w-5xl mx-auto px-4 pt-16 pb-14 text-center relative overflow-hidden'>

                {/* Decorative blobs */}
                <div className='absolute top-0 left-1/4 w-64 h-64 bg-indigo-300 rounded-full opacity-10 blur-3xl'></div>
                <div className='absolute top-10 right-1/4 w-64 h-64 bg-violet-300 rounded-full opacity-10 blur-3xl'></div>

                <div className='relative'>
                    <div className='w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
                        </svg>
                    </div>

                    <span className='inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600 mb-4'>
                        MERN Stack Project
                    </span>

                    <h1 className='text-3xl sm:text-5xl font-bold text-gray-800 mb-4 leading-tight'>
                        Manage Your Contacts <br className='hidden sm:block' />
                        <span className='bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent'>
                            Simply & Securely
                        </span>
                    </h1>

                    <p className='text-gray-500 max-w-xl mx-auto mb-8 text-sm sm:text-base'>
                        Contact App is a full-stack contact management system where admins can manage users,
                        and everyone gets a clean, secure dashboard to stay organized.
                    </p>

                    <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
                        <button
                            onClick={() => navigate('/register')}
                            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-violet-700 transition shadow-lg shadow-indigo-200"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full sm:w-auto bg-white text-indigo-600 border border-indigo-200 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className='max-w-5xl mx-auto px-4 pb-20'>
                <div className='text-center mb-10'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-2'>What you can do</h2>
                    <p className='text-gray-500 text-sm'>Everything you need to manage contacts, built in one place</p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className='bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition text-center'
                        >
                            <div className='w-12 h-12 mx-auto mb-4 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center'>
                                {feature.icon}
                            </div>
                            <h3 className='font-semibold text-gray-800 mb-2'>{feature.title}</h3>
                            <p className='text-sm text-gray-500'>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer CTA */}
            <div className='max-w-3xl mx-auto px-4 pb-16 text-center'>
                <div className='bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-8 sm:p-10 shadow-xl shadow-indigo-200'>
                    <h3 className='text-xl sm:text-2xl font-bold text-white mb-2'>Ready to get started?</h3>
                    <p className='text-indigo-100 mb-6 text-sm sm:text-base'>Create your account today and start managing your contacts.</p>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition"
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home