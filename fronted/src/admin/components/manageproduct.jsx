
import { useState } from 'react'
import Adminsidebar from '../Adminsidebar'
import './manageproduct.css'
import axios from '../../utility/axiosinstance';
import { useEffect } from 'react';


export default function ManageProduct() {

  const [pname, setPname] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [img, setImg] = useState("")
  const [modalOpen, setModalOpen] = useState(false);
  const [editid, setEditid] = useState();
  let [product, setProduct] = useState([]);

  async function handlesubmit(e) {
    e.preventDefault();
    let formdata = new FormData();

    formdata.append('pname', pname);
    formdata.append('price', price);
    formdata.append('description', description);
    formdata.append('img', img);
    formdata.append('rating', rating);

    try {

      if (editid) {
        let { data } = await axios.put(`/product/update/${editid}`, formdata);

        alert(data.message);
        setModalOpen(false);
        window.location.reload;
      } else {

        let { data } = await axios.post("/product/add", formdata);

        alert(data.message);
        setModalOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  }

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


  async function handledelet(id) {
    try {
      let { data } = await axios.delete(`/product/delete/${id}`);
      alert(data.message);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  async function handleupdate(item) {
    setModalOpen(true);
    setEditid(item._id);
    setPname(item.pname);
    setPrice(item.price);
    setDescription(item.description);
    setRating(item.rating);
    setImg(item.img);
  }

  return (
    <div className="admin-page">
      <Adminsidebar />

      <main className="admin-main">
        <div className="manage-header">
          <h2>Manage Products</h2>
          <div className="manage-actions">
            <button className="btn" onClick={() => setModalOpen(true)}>New Product</button>
          </div>
        </div>


        <div className="table-wrap">
          <table className="product-table">
            <thead>
              <th>img</th>
              <th>name</th>
              <th>description</th>
              <th>price</th>
              <th>rating</th>
              <th>Action</th>
            </thead>
            <tbody>
              {product.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img className="product-thumb" src={`http://localhost:3000/upload/${item.img}`} alt={item.pname} />
                  </td>
                  <td className="product-name">{item.pname}</td>
                  <td className="product-desc">{item.description}</td>
                  <td className="product-price">₹{item.price}</td>
                  <td className="product-rating">{item.rating}</td>
                  <td>
                    <button onClick={() => handleupdate(item)}>update</button>
                    <button onClick={() => handledelet(item._id)}>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalOpen && (
          <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>

              <form>
                <label>Product Name<input name="pname" value={pname} required onChange={(e) => setPname(e.target.value)} /></label>
                <label>Price<input name="price" required type="number" value={price} step="0.01" onChange={(e) => setPrice(e.target.value)} /></label>

                <label>Upload image
                  <input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
                </label>
                <label>Description<textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} /></label>
                <label>Rating<input name="rating" type="number" value={rating} step="0.1" min="0" max="5" onChange={(e) => setRating(e.target.value)} /></label>

                <div className="form-actions">
                  <button type="submit" className="btn primary" onClick={handlesubmit}>add</button>
                  <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

