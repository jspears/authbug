import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
function logout(){
  supabase.signOut();
}
export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div>
      {!session ? <Auth /> : <div>Hello, {session.user.email}
      <button onClick={logout}>logout</button>
      </div>}

      <p>Auth Bug Demonstartion  Log in twice
      
      Source code <a href="https://github.com/jspears/authbug">source code</a>
      </p>
    </div>
  )
}

