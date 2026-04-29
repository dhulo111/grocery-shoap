import { useContext, useState } from "react";
import axios from "../utility/axiosinstance";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./cart.css";


function Cart() {
  let [cart, setCart] = useState(null);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let userid = localStorage.getItem("userid");

  async function getCart() {
    try {
      let response = await axios.get(`/product/cart/get/${userid}`);
      setCart(response.data.cart);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  async function handleremove(id) {
    try {
      let { data } = await axios.delete(`/product/cart/remove/${id}/${userid}`);

      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  async function handlepayment(totalamount) {
    try {
      let { data } = await axios.post("/product/createorder", {
        amount: totalamount, currency: "INR"
      })

      let { amount, currency, id } = data;

      const option = {
        key: "rzp_test_WgxamtVupSULV6",
        amount: amount,
        currency: currency,
        name: "MySite",
        description: "one eccomerce site",
        order_id: id,
        handler: async (response) => {
          let { data } = await axios.post("/product/verify", response);
          alert(data.data.message);
          navigate("/order");
          getCart();

        },
        prefill: {
          name: "ironman",
          email: "admin@gmail.com",
          contact: "1111111111"
        },
        theme: { color: "blue" },
      };

      const paymentobject = new window.Razorpay(option);
      paymentobject.open();

    } catch (e) { console.log(e.message) };
  }


  if (loading) {
    return <div className="cart-container"><p>Loading cart...</p></div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span className="item-count">{cart.items.length} Items</span>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map((item, index) => (
            <div key={item._id} className="cart-item">
              <div className="item-image">
                <img
                  src={`http://localhost:3000/upload/${item.img}`}
                  alt={item.pname}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/120";
                  }}
                />
              </div>

              <div className="item-details">
                <h3 className="product-name">{item.pname}</h3>
                <p className="product-description">{item.description}</p>

                <div className="item-metadata">
                  <span className="rating">⭐ {item.rating}</span>
                  <span className="product-id">ID: {item.productid}</span>
                </div>
              </div>

              <div className="item-pricing">
                <div className="quantity-box">
                  <span className="quantity-label">Qty:</span>
                  <span className="quantity-value">{item.quentity}</span>
                </div>

                <div className="price-box">
                  <span className="unit-price">₹{item.price}</span>
                  <span className="divider">×</span>
                  <span className="quantity-badge">{item.quentity}</span>
                </div>
              </div>

              <div className="item-total">
                <p className="total-price">₹{(item.price * item.quentity).toLocaleString()}</p>
              </div>

              <div className="item-action">
                <button className="remove-btn" onClick={() => handleremove(item.productid)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{cart.totalAmount.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Shipping:</span>
              <span className="shipping-free">FREE</span>
            </div>

            <div className="summary-row">
              <span>Tax:</span>
              <span>₹{Math.round(cart.totalAmount * 0.18).toLocaleString()}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <span>Total Amount:</span>
              <span className="total-amount">
                ₹{(cart.totalAmount + Math.round(cart.totalAmount * 0.18)).toLocaleString()}
              </span>
            </div>

            <button className="checkout-btn" onClick={() => handlepayment(cart.totalAmount + Math.round(cart.totalAmount * 0.18))}>Buy Now</button>
            <button className="continue-shopping-btn" onClick={() => navigate('/product')}>Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;