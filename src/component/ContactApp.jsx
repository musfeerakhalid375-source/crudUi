import React, { useState, useEffect } from 'react'
import { getUsers, deleteUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const ContactApp = () => {
    const [users, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 6
    const navigate = useNavigate()

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        setLoading(true)
        try {
            const response = await getUsers()
            // ✅ Admin ka apna data list se hide kar diya
            const nonAdminUsers = response.data.users.filter(u => u.role !== "admin")
            setUser(nonAdminUsers);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteUser(id);
            fetchUser();
        } catch (error) {
            console.log(error);
        }
    };

    // Search filter
    const filteredUsers = users.filter((user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    )

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
    const startIndex = (currentPage - 1) * usersPerPage
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
    }

    // Avatar helpers
    const getInitials = (name) => {
        if (!name) return "?"
        return name.trim().split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    }

    const avatarColors = ["bg-indigo-500", "bg-violet-500", "bg-pink-500", "bg-emerald-500", "bg-amber-500", "bg-cyan-500", "bg-rose-500", "bg-fuchsia-500"]
    const getAvatarColor = (name) => {
        if (!name) return avatarColors[0]
        const index = name.charCodeAt(0) % avatarColors.length
        return avatarColors[index]
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-3 sm:px-4 py-6 sm:py-10'>
            <div className='max-w-6xl mx-auto'>

                {/* Header */}
                <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6'>
                    <div>
                        <h1 className='text-xl sm:text-2xl font-bold text-gray-800'>Users Management</h1>
                        <p className='text-sm text-gray-500'>Manage all registered users</p>
                    </div>
                    <span className='bg-white border border-indigo-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg shadow-sm w-fit'>
                        Total: <span className='text-indigo-600 font-bold'>{filteredUsers.length}</span>
                    </span>
                </div>

                {/* Search bar */}
                <div className='mb-4'>
                    <div className='relative max-w-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                        />
                    </div>
                </div>

                {/* Table Card */}
                <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                    {loading ? (
                        <div className='p-16 text-center text-gray-400'>
                            <div className='animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-3'></div>
                            Loading users...
                        </div>
                    ) : paginatedUsers.length === 0 ? (
                        <div className='p-16 text-center text-gray-400'>
                            {search ? "No users match your search." : "No users found."}
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className='hidden sm:block overflow-x-auto'>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className='bg-indigo-50/70 border-b border-indigo-100'>
                                            <th className="text-left px-5 py-3 font-semibold text-gray-600 uppercase text-xs tracking-wider">User</th>
                                            <th className="text-left px-5 py-3 font-semibold text-gray-600 uppercase text-xs tracking-wider">Email</th>
                                            <th className="text-left px-5 py-3 font-semibold text-gray-600 uppercase text-xs tracking-wider">Phone</th>
                                            <th className="text-left px-5 py-3 font-semibold text-gray-600 uppercase text-xs tracking-wider">Role</th>
                                            <th className="text-right px-5 py-3 font-semibold text-gray-600 uppercase text-xs tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-100'>
                                        {paginatedUsers.map((user) => (
                                            <tr key={user._id} className='hover:bg-indigo-50/40 transition'>
                                                <td className="px-5 py-3.5">
                                                    <div className='flex items-center gap-3'>
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                                                        ) : (
                                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold ${getAvatarColor(user.name)}`}>
                                                                {getInitials(user.name)}
                                                            </div>
                                                        )}
                                                        <span className='font-medium text-gray-800'>{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-gray-600">{user.email}</td>
                                                <td className="px-5 py-3.5 text-gray-600">{user.phone}</td>
                                                <td className="px-5 py-3.5">
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <div className='flex justify-end gap-2'>
                                                        <button
                                                            onClick={() => navigate(`/register/${user._id}`)}
                                                            className="bg-white border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-emerald-50 transition"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(user._id)}
                                                            className="bg-white border border-red-200 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-50 transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards — centered flex layout */}
                           {/* Mobile Cards — centered flex layout, ab clearly separated */}
<div className='sm:hidden flex flex-col gap-4 p-4 bg-gray-50'>
    {paginatedUsers.map((user) => (
        <div
            key={user._id}
            className='flex flex-col items-center text-center p-5 gap-2 bg-white rounded-2xl shadow-md border border-gray-100'
        >
            {/* Avatar */}
            {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover" />
            ) : (
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-semibold ${getAvatarColor(user.name)}`}>
                    {getInitials(user.name)}
                </div>
            )}

            {/* Name */}
            <p className='font-semibold text-gray-800 text-base'>{user.name}</p>

            {/* Role badge */}
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600">
                {user.role}
            </span>

            {/* Email + Phone — column, centered */}
            <div className='flex flex-col items-center gap-0.5 text-sm text-gray-500 mt-1'>
                <span>{user.email}</span>
                <span>📞 {user.phone}</span>
            </div>

            {/* Buttons — same row, side by side */}
            <div className='flex gap-2 mt-3 w-full max-w-[220px]'>
                <button
                    onClick={() => navigate(`/register/${user._id}`)}
                    className="flex-1 bg-white border border-emerald-200 text-emerald-700 py-1.5 rounded-lg text-xs font-medium hover:bg-emerald-50 transition"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(user._id)}
                    className="flex-1 bg-white border border-red-200 text-red-600 py-1.5 rounded-lg text-xs font-medium hover:bg-red-50 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    ))}
</div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className='flex items-center justify-between border-t border-gray-100 px-5 py-4 flex-wrap gap-3'>
                                    <p className='text-xs text-gray-500'>
                                        Showing {startIndex + 1}-{Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length}
                                    </p>
                                    <div className='flex items-center gap-1.5'>
                                        <button
                                            onClick={() => goToPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className='w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm'
                                        >
                                            ‹
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => goToPage(page)}
                                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                                                    currentPage === page
                                                        ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white"
                                                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => goToPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className='w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm'
                                        >
                                            ›
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContactApp