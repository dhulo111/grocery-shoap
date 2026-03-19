import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let { data } = await axios.post("http://localhost:3000/user/login", { email, password });

      alert(data.message);

      localStorage.setItem("tocken", data.tocken);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("userid", data.user._id);
      localStorage.setItem("role", data.user.role);

      if (data.user.role == "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      window.location.reload();
    } catch (e) {
      alert(e);
    }
  }

  return (
    <section className="form-panel">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>

        <button type="submit" className="btn">Login</button>
      </form>
    </section>
  )
}

export default Login
