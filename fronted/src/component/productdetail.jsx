import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  let { id } = useParams();
  let [product, setProduct] = useState({});
  async function getproduct() {
    try {
      let data = await axios.get(`http://localhost:3000/product/detail/${id}`);
      setProduct(data.data);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getproduct()
  }, [])

  console.log(product);

  return (
    <>
      <h1>product detail:</h1>
      <img src={`http://localhost:3000/upload/${product.img}`} alt="dsdsd" />
    </>
  )
}

export default ProductDetail;