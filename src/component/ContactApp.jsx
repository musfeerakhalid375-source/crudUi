import React, { useState, useEffect } from 'react'
import { getUsers, updateUser, deleteUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const ContactApp = () => {
    const [users, setUser] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const response = await getUsers()
                    // console.log("API response:", response.data)  

            setUser(response.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            fetchUser();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='flex justify-center mb-6'>
            <table className="w-[50%] mt-4 border border-gray-300">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone</th>
                        
                                <th className="border p-2">Action</th>
                           
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td className="border p-2 text-black">{user.name}</td>
                            <td className="border p-2 text-black">{user.email}</td>
                            <td className="border p-2 text-black">{user.phone}</td>
                            
                                {
                                    user.role === "student" && (
                                        <>
                                        <td className="border p-2 flex gap-2">
                                        <button onClick={() => navigate(`/register/${user._id}`)} className="bg-green-600 text-white px-3 py-1 rounded">Edit</button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                                </td>
                                
                                </>
                                    )
                                }
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ContactApp