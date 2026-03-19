
import { useState } from 'react'
import Adminsidebar from '../Adminsidebar'
import './manageproduct.css'
import axios from 'axios';


export default function ManageProduct() {

  const [pname, setPname] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [img, setImg] = useState("")
  const [modalOpen, setModalOpen] = useState(false);


  async function handlesubmit(e) {
    e.preventDefault();
    let formdata = new FormData();

    formdata.append('pname', pname);
    formdata.append('price', price);
    formdata.append('description', description);
    formdata.append('img', img);
    formdata.append('rating', rating);
    console.log(formdata.get('pname'));
    try {

      let { data } = await axios.post("http://localhost:3000/product/add", formdata);

      alert(data.message);
      setModalOpen(false);
    } catch (e) {
      console.log(e);
    }
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



        {modalOpen && (
          <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>

              <form>
                <label>Product Name<input name="pname" required onChange={(e) => setPname(e.target.value)} /></label>
                <label>Price<input name="price" required type="number" step="0.01" onChange={(e) => setPrice(e.target.value)} /></label>

                <label>Upload image
                  <input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
                </label>
                <label>Description<textarea name="description" onChange={(e) => setDescription(e.target.value)} /></label>
                <label>Rating<input name="rating" type="number" step="0.1" min="0" max="5" onChange={(e) => setRating(e.target.value)} /></label>

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

