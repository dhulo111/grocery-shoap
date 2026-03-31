import axios from "../utility/axiosinstance";
import { useState } from "react";
import { useEffect } from "react";
import "./product.css";
import { useNavigate } from "react-router-dom";

function Product() {
  let navigate = useNavigate();
  let [product, setProduct] = useState([]);
  let user_id = localStorage.getItem("user");
  async function getproduct() {
    try {
      let data = await axios.get("/product/all");
      setProduct(data.data.product);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getproduct();
  }, [])


  async function handlecart(id) {
    try {
      let { data } = await axios.post("/product/cart/add", { productid: id, userid: user_id });
      alert(data.message);
    } catch (e) {
      console.log(e);
    }
  }

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
                <button className="btn btn-primary" onClick={() => handlecart(item._id)}>Add to Cart</button>
                <button className="btn btn-secondary" onClick={() => navigate(`/detail/${item._id}`)}>View</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Product;