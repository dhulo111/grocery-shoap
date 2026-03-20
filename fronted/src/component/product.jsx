import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./product.css";

function Product() {
  let [product, setProduct] = useState([]);

  async function getproduct() {
    try {
      let data = await axios.get("http://localhost:3000/product/all");
      setProduct(data.data.product);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getproduct();
  }, [])

  return (
    <>
      <h1>this is product page:</h1>
      <div className="product-list">
        {product.map((item) => {
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
                <button className="btn btn-primary">Add to Cart</button>
                <button className="btn btn-secondary">View</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Product;