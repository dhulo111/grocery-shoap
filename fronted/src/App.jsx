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
import ProductDetail from "./component/productdetail"
import ProtectedRoute from "./utility/protectedroute"
import Cart from "./component/cart"
import Contactus from "./component/contactus"
import Myorder from "./component/myorder"
import Manageorder from "./admin/components/manageorders"
import Manageuser from "./admin/components/manageUser"

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
            <Route path="/admin/order" element={<Manageorder />} />
            <Route path="/admin/user" element={<Manageuser />} />
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
            <Route path="/product" element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            } />
            <Route path="/detail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contactus />} />
            <Route path="/order" element={<Myorder />} />
          </Routes>
        </>}
    </>
  )
}

export default App
