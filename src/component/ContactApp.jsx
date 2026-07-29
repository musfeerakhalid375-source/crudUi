import React, { useState, useEffect } from 'react'
import { getUsers, deleteUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const ContactApp = () => {
    const [users, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        setLoading(true)
        try {
            const response = await getUsers()
            setUser(response.data.users);
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

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 px-4 py-10'>
            <div className='max-w-5xl mx-auto'>

                {/* Header */}
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-800'>Users Management</h1>
                        <p className='text-sm text-gray-500'>Manage all registered users</p>
                    </div>
                    <span className='bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg'>
                        Total: {users.length}
                    </span>
                </div>

                {/* Table Card */}
                <div className='bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden'>
                    {loading ? (
                        <div className='p-10 text-center text-gray-400'>Loading users...</div>
                    ) : users.length === 0 ? (
                        <div className='p-10 text-center text-gray-400'>No users found.</div>
                    ) : (
                        <div className='overflow-x-auto'>
                            <table className="w-full text-sm">
                                <thead className="bg-blue-600 text-white">
                                    <tr>
                                        <th className="text-left p-3 font-medium">Name</th>
                                        <th className="text-left p-3 font-medium">Email</th>
                                        <th className="text-left p-3 font-medium">Phone</th>
                                        <th className="text-left p-3 font-medium">Role</th>
                                        <th className="text-left p-3 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-100'>
                                    {users.map((user) => (
                                        <tr key={user._id} className='hover:bg-gray-50 transition'>
                                            <td className="p-3 text-gray-800 font-medium">{user.name}</td>
                                            <td className="p-3 text-gray-600">{user.email}</td>
                                            <td className="p-3 text-gray-600">{user.phone}</td>
                                            <td className="p-3">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    user.role === "admin"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <div className='flex gap-2'>
                                                    <button
                                                        onClick={() => navigate(`/register/${user._id}`)}
                                                        className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700 transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-700 transition"
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContactApp