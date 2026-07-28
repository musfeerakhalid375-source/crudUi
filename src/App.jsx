import React from 'react'
import './App.css'
import Register from './component/Register'
import Navbar from './component/Navbar'
import { Route, Routes , Navigate  } from 'react-router-dom'
import Login from './component/Login'
import ContactApp from './component/ContactApp'
import Home from './component/Home'

const App = () => {
  return (
    <div>
      <Navbar/>
<Routes>
   <Route path='/' element={<Navigate to={'/users'}/>} /> 
   
  <Route path='/register' element={<Register/>} />
  <Route path='/register/:id' element={<Register/>} /> 
  <Route path='/login' element={<Login/>} />
  <Route path='/users' element={<ContactApp/>} />
</Routes>
    </div>
  )
}

export default App