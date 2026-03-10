import { useState } from 'react'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) {
      alert('Passwords do not match')
      return
    }
    // placeholder: replace with real registration call
    alert(`Registered ${name} (${email})`)
    console.log('register', { name, email, password })
  }

  return (
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
  )
}

export default Register
