import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from 'react'
import Navbar from './component/navbar'
import Login from './component/Login'
import Register from './component/Register'
import './component/forms.css'
import Home from "./component/home"

function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
