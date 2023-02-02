import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
function logout(){
  supabase.signOut();
}
const params =  new URLSearchParams(window.location.search);
const error_description = params.get('error_description');
const error = params.get('error');

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
      {(error || error_description) ? <div class='error'>
        <div>Error {error}</div>
        <p>{error_description}</p>
      </div> : null}
      <p>Auth Bug Demonstration  Log in twice
      
      Source code <a href="https://github.com/jspears/authbug">source code</a>
      </p>
    </div>
  )
}

