
import './App.css'
import { useEffect, useState } from 'react'
import Navbar from './component/navbar'
import Login from './component/Login'
import Register from './component/Register'
import './component/forms.css'

function App() {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || 'home')

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || 'home')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '2rem' }}>
        {route === 'home' && (
          <>
            <h1>Welcome</h1>
            <p>This is a starter page. Use the navbar to navigate.</p>
          </>
        )}

        {route === 'login' && <Login />}
        {route === 'register' && <Register />}
      </main>
    </>
  )
}

export default App
