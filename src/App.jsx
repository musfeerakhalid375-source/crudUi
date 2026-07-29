import React from 'react'
import './App.css'
import Register from './component/Register'
import Navbar from './component/Navbar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './component/Login'
import ContactApp from './component/ContactApp'
import Home from './component/Home'
import ProtectedRoute from './routes/ProtectedRoutes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
  <Route path='/' element={<Navigate to="/register" />} />

  <Route path='/register' element={<Register/>} />
  <Route path='/login' element={<Login/>} />

  <Route
    path='/users'
    element={
      <ProtectedRoute>
        <ContactApp/>
      </ProtectedRoute>
    }
  />

  <Route
    path='/register/:id'
    element={
      <ProtectedRoute>
        <Register/>
      </ProtectedRoute>
    }
  />

  <Route path='*' element={<h1>Page Not Found</h1>} />
</Routes>
    </div>
  )
}

export default App