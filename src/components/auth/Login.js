import React from 'react'
import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import { TextField, Button, CircularProgress } from '@mui/material'
const Login = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState("")
  const handleClick = () => {
    setOpen(true);
  };
  const handleLoginMagic = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-2 w-full'>
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
      <Button variant='contained' sx={{ width: "100%", marginInline: "auto" }} onClick={handleLoginMagic}>
        {!loading ? "Login" : <CircularProgress />}
      </Button>
    </div>
  )
}

export default Login