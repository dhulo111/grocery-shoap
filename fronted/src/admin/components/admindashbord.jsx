import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "../../utility/axiosinstance"
import Adminsidebar from '../Adminsidebar'
import './admindashbord.css'

export default function AdminDashbord() {
  const [product, setProduct] = useState([]);
  const [productsCount, setProductsCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  const [recent, setRecent] = useState([])
  const [order, setOrders] = useState([]);
  const [totalrevenue, setTotalrevenue] = useState(0);

  useEffect(() => {
    fetchCounts()
    getAllorder()
  }, [])

  useEffect(() => {
    setProductsCount(product.length);

    setTotalrevenue(order.reduce((curr, item) => curr + item.totalAmount, 0));


  }, [product, order])

  async function fetchCounts() {
    try {
      let data = await axios.get("/product/all");
      setProduct(data.data.product);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllorder() {
    try {
      let data = await axios.get(`/product/getallorder`);
      setOrders(data.data);
    } catch (e) {
      console.log(e);
      alert("Error fetching orders");
    }
  }

  return (
    <div className="admin-page">
      <Adminsidebar />

      <main className="admin-main">
        <header className="admin-main__header">
          <h1>Admin Dashboard</h1>
          <div className="quick-actions">
            <Link to="/admin/products" className="btn">Manage Products</Link>
            <Link to="/admin/users" className="btn">Manage Users</Link>
          </div>
        </header>

        <section className="stats">
          <div className="card">
            <div className="card__title">Products</div>
            <div className="card__value">{productsCount}</div>
          </div>
          <div className="card">
            <div className="card__title">Users</div>
            <div className="card__value">{usersCount}</div>
          </div>
          <div className="card">
            <div className="card__title">Total Revenue</div>
            <div className="card__value">{totalrevenue}</div>
          </div>
        </section>

        <section className="recent">
          <h2>Recent Products</h2>
          {recent.length === 0 && <p>No recent products.</p>}
          <ul>
            {recent.map((p) => (
              <li key={p._id || p.id}>
                <img src={p.image || '/placeholder.png'} alt={p.name} />
                <div className="meta">
                  <div className="name">{p.name}</div>
                  <div className="price">${p.price}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}


// [{},{},{},{}]
