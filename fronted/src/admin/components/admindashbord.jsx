import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Adminsidebar from '../Adminsidebar'
import './admindashbord.css'

export default function AdminDashbord() {
  const [productsCount, setProductsCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  const [recent, setRecent] = useState([])

  useEffect(() => {
    fetchCounts()
  }, [])

  async function fetchCounts() {
    try {
      const pRes = await fetch('/api/products')
      const products = pRes.ok ? await pRes.json() : []
      setProductsCount(Array.isArray(products) ? products.length : 0)
      setRecent(Array.isArray(products) ? products.slice(0, 5) : [])

      const uRes = await fetch('/api/users')
      const users = uRes.ok ? await uRes.json() : []
      setUsersCount(Array.isArray(users) ? users.length : 0)
    } catch (err) {
      // silent fail for dashboard
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
