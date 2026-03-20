import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from 'react'
import Navbar from './component/navbar'
import Login from './component/Login'
import Register from './component/Register'
import './component/forms.css'
import Home from "./component/home"
import Profile from "./component/profile"
import AdminDashbord from "./admin/components/admindashbord"
import ManageProduct from "./admin/components/manageproduct"
import Product from "./component/product"

function App() {
  let role = localStorage.getItem("role");

  return (
    <>
      {role == "Admin" ?
        <>
          <Routes>
            <Route path="/admin" element={<AdminDashbord />} >

            </Route>
            <Route path="/admin/product" element={<ManageProduct />} />
          </Routes>
        </>
        :
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </>}
    </>
  )
}

export default App
