import React from 'react'
import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import { TextField, Button } from '@mui/material'
import AlertError from '../AlertError'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState("")

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleLoginMagic = async (e) => {
    e.preventDefault()

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (error) {
      setSnackBarText(error.error_description || error.message)
      setOpen(true);

    } finally {
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
        Sign In
      </Button>
      <AlertError open={open} onClose={handleClose} value={snackBarText} />
    </div>
  )
}
export default Login;