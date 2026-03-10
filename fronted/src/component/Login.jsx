import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // placeholder: replace with real auth call
    alert(`Logging in as ${email}`)
    console.log('login', { email, password })
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
