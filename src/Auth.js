import { useState } from 'react'
import { supabase } from './supabaseClient'
 function oauthSignIn(e){
    e.preventDefault()
   const provider = e.currentTarget.dataset.provider;
   supabase.auth.signInWithOAuth({
        provider,
        options: {
        redirectTo: window.location.href,
        }
      }).then(console.log, console.error);

}
export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email, options:{
        emailRedirectTo:window.location.href
      } })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Supabase + React</h1>
        <p className="description">Sign in via magic link with your email below</p>
        {loading ? (
          'Sending magic link...'
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              Send magic link
            </button>
         
          </form>

        )}
      </div>
      <button type='button' className="button block" data-provider='google' aria-live="polite" onClick={oauthSignIn}>
              google
         </button>
         <button type='button' className="button block" data-provider='github' aria-live="polite" onClick={oauthSignIn}>
              github
         </button>

    </div>
  )
}