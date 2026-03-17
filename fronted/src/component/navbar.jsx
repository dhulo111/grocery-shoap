import { useState } from 'react'
import './navbar.css'
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false)

  let tocken = localStorage.getItem("tocken")

  return (
    <header className="site-navbar">
      <div className="nav-container">
        <Link className="brand" href="#">MySite</Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
          <Link href="#contact">Contact</Link>
          {tocken ? <Link to="/profile">Profile</Link> :
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>}

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