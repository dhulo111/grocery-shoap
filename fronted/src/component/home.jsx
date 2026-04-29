import { useState, useEffect } from 'react';
import axios from "../utility/axiosinstance";
import { Link, useNavigate } from "react-router-dom";
import { FaTruck, FaLeaf, FaHeadset, FaShoppingBasket } from "react-icons/fa";
import "./home.css";
import "./product.css"; // Reuse product card styles

function Home() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/product/all");
        // Take first 4 products for featured section
        setFeaturedProducts(response.data.product.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = [
    { name: "Fresh Vegetables", img: "https://images.unsplash.com/photo-1566385101042-1a000c1268c4?auto=format&fit=crop&q=80&w=400", path: "/product" },
    { name: "Organic Fruits", img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=400", path: "/product" },
    { name: "Dairy & Eggs", img: "https://images.unsplash.com/photo-1550583724-1255818c053b?auto=format&fit=crop&q=80&w=400", path: "/product" },
    { name: "Bakery Items", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400", path: "/product" },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200')` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Freshness Delivered To Your Doorstep</h1>
          <p>Get the finest organic produce and grocery essentials within 30 minutes. Quality you can taste, convenience you can trust.</p>
          <Link to="/product" className="cta-button">Shop Now</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-grid">
          <div className="feature-item">
            <i><FaTruck /></i>
            <h4>Free Delivery</h4>
            <p>On all orders above ₹500</p>
          </div>
          <div className="feature-item">
            <i><FaLeaf /></i>
            <h4>100% Organic</h4>
            <p>Straight from local farms</p>
          </div>
          <div className="feature-item">
            <i><FaHeadset /></i>
            <h4>24/7 Support</h4>
            <p>Always here to help you</p>
          </div>
          <div className="feature-item">
            <i><FaShoppingBasket /></i>
            <h4>Secure Checkout</h4>
            <p>100% protected payments</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="section-title">
          <h2>Browse Categories</h2>
          <p>Explore our wide range of fresh products</p>
        </div>
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div key={index} className="category-card" onClick={() => navigate(cat.path)}>
              <img src={cat.img} alt={cat.name} />
              <div className="category-overlay">
                <h3>{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section featured-products">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Handpicked essentials for your kitchen</p>
        </div>
        
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading products...</p>
        ) : (
          <div className="product-list">
            {featuredProducts.map((item) => {
              const r = Math.max(0, Math.min(5, Math.round(item.rating || 0)));
              return (
                <div key={item._id} className="product-card">
                  {item.img && (
                    <img
                      src={`http://localhost:3000/upload/${item.img}`}
                      alt={item.pname}
                      className="product-image"
                    />
                  )}
                  <h3 className="product-title">{item.pname}</h3>
                  <div className="product-meta">
                    <span className="price">₹{item.price}</span>
                    <span className="rating">{'★'.repeat(r)}{'☆'.repeat(5 - r)}</span>
                  </div>
                  <p className="description">{item.description}</p>
                  <div className="actions">
                    <button className="btn btn-primary" onClick={() => navigate('/product')}>Add to Cart</button>
                    <button className="btn btn-secondary" onClick={() => navigate(`/detail/${item._id}`)}>View</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/product" className="btn btn-secondary" style={{ padding: '12px 24px' }}>View All Products</Link>
        </div>
      </section>
      
      {/* Newsletter/Footer Preview */}
      <section className="section" style={{ background: '#f7f7fb', borderRadius: '24px', margin: '40px auto' }}>
        <div className="section-title">
          <h2>Join Our Newsletter</h2>
          <p>Get weekly updates on fresh arrivals and exclusive offers.</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', maxWidth: '500px', margin: '20px auto' }}>
            <input type="email" placeholder="Enter your email" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', flex: 1 }} />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;