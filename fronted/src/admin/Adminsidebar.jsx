import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './adminsidebar.css'

const links = [
  { to: '/admin', label: 'Dashboard', icon: '🏠' },
  { to: '/admin/product', label: 'Manage Product', icon: '📦' },
  { to: '/admin/order', label: 'Manage Orders', icon: '🍔' },
  { to: '/admin/user', label: 'Manage User', icon: '🧑‍🧑‍🧒‍🧒' },

]

export default function Adminsidebar() {
  const location = useLocation()

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">Admin Panel</div>

      <nav className="admin-sidebar__nav">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`admin-sidebar__link ${location.pathname === l.to ? 'active' : ''}`}
          >
            <span className="admin-sidebar__icon">{l.icon}</span>
            <span className="admin-sidebar__label">{l.label}</span>
          </Link>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <Link to="/logout" className="admin-sidebar__link logout">
          <span className="admin-sidebar__icon">🔓</span>
          <span className="admin-sidebar__label">Logout</span>
        </Link>
      </div>
    </aside>
  )
}
