import { useState } from 'react'
import './navbar.css'

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-navbar">
      <div className="nav-container">
        <a className="brand" href="#">MySite</a>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <a href="#">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <a href="#register">Register</a>
          <a href="#login">Login</a>
        </nav>

        <button
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-label="Toggle navigation"
          onClick={() => setOpen(s => !s)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Navbar