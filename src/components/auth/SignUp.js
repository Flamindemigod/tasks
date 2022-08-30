import { supabase } from '../../supabaseClient'
import React, {useState} from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'

const SignUp = () => {
    const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      alert('Check your confirm email!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col gap-2'>
      <TextField
        label="Email"
        id="email"
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        id="password"
        type="password"
        placeholder="Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant='contained' sx={{ width: "100%", marginInline: "auto" }} onClick={handleSignUp}>
        {!loading ? "Sign Up" : <CircularProgress />}
      </Button>
    </div>
  )
}

export default SignUp