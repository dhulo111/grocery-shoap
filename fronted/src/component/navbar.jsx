import { useState, useEffect } from 'react'
import './navbar.css'
import axios from "../utility/axiosinstance";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBoxOpen, FaInfoCircle, FaPhoneAlt, FaStore } from "react-icons/fa";

function Navbar() {
  let [cart, setCart] = useState(null);
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0);
  let userid = localStorage.getItem("userid");
  let tocken = localStorage.getItem("tocken")

  async function getCart() {
    try {
      let response = await axios.get(`/product/cart/get/${userid}`);
      setCart(response.data.cart);

    } catch (error) {
      console.error("Error fetching cart:", error);

    }
  }

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (cart && cart.items) {
      const totalItems = cart.items.reduce((sum, item) => sum + item.quentity, 0);
      setCount(totalItems);
    }
  }, [cart]);

  return (
    <header className="site-navbar">
      <div className="nav-container">
        <Link className="brand" to="/">
          <FaStore style={{ color: 'var(--primary)', marginRight: '8px' }} />
          <span>FreshCart</span>
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/product">Shop</Link>
          <Link to="/contact">Contact</Link>

          {tocken ?
            <>
              <Link to="/order"><FaBoxOpen /> Orders</Link>
              <Link to="/profile"><FaUser /> Profile</Link>
              <Link to="/cart" className="cart-link">
                <FaShoppingCart />
                <span className="cart-count">{count}</span>
              </Link>
            </>
            :
            <>
              <Link to="/register">Register</Link>
              <Link to="/login" className="login-btn">Login</Link>
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