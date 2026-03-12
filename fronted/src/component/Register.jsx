import { useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) {
      alert('Passwords do not match')
      return
    }
    try {
      let { data } = await axios.post("http://localhost:3000/user/register", { email, password, name });

      alert(data.message);

      navigate("/login")
    } catch (e) {
      console.log(e);
      toast(e.message);
    }

  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section className="form-panel">

        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Full name
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </label>

          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>

          <label>
            Confirm password
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
          </label>

          <button type="submit" className="btn">Create account</button>
        </form>
      </section>
    </>
  )
}

export default Register
