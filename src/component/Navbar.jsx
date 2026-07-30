import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        setUser(storedUser)
    }, [location])

    const handleLogout = () => {
        localStorage.removeItem("user")
        setUser(null)
        setMenuOpen(false)
        navigate("/login")
    }

    const handleNav = (path) => {
        navigate(path)
        setMenuOpen(false)
    }

    const getInitials = (name) => {
        if (!name) return "U"
        return name.trim().split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    }

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 px-4 sm:px-8 py-4 sticky top-0 z-50">
            <div className="flex justify-between items-center max-w-6xl mx-auto">

                {/* Logo */}
                <h1
                    onClick={() => navigate(user ? (user.role === 'admin' ? '/users' : '/home') : '/')}
                    className="text-xl sm:text-2xl font-bold text-indigo-600 cursor-pointer flex items-center gap-2"
                >
                    <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
                        </svg>
                    </span>
                    <span className="hidden sm:inline" onClick={()=>navigate("/")} >Contact App</span>
                </h1>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <>
                            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 pl-2 pr-4 py-1.5 rounded-full">
                                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-xs font-semibold flex items-center justify-center">
                                    {getInitials(user.name)}
                                </span>
                                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-50 text-red-600 border border-red-200 px-5 py-2 rounded-lg font-medium hover:bg-red-100 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/register')}
                                className="text-indigo-600 border border-indigo-200 px-5 py-2 rounded-lg font-medium hover:bg-indigo-50 transition duration-300"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-violet-700 transition duration-300 shadow-sm"
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden w-9 h-9 flex items-center justify-center text-gray-600"
                >
                    {menuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-4 pb-2 flex flex-col gap-2 max-w-6xl mx-auto">
                    {user ? (
                        <>
                            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-2 rounded-lg">
                                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-xs font-semibold flex items-center justify-center">
                                    {getInitials(user.name)}
                                </span>
                                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-lg font-medium hover:bg-red-100 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleNav('/register')}
                                className="text-indigo-600 border border-indigo-200 px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-50 transition"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => handleNav('/login')}
                                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-5 py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-violet-700 transition"
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar