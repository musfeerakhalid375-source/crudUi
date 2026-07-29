import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (!user) {
        return <Navigate to="/login" />
    }

    if (user.role !== "admin") {
        return <Navigate to="/" />
    }

    // ✅ Admin hai to page dikhayein
    return children
}

export default ProtectedRoute