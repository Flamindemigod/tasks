import React from 'react'
import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import { TextField, Button, CircularProgress } from '@mui/material'
import AlertError from '../AlertError'
import ForgotPasswordDialog from './ForgotPasswordDialog'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    } catch (error) {
      setSnackBarText(error.error_description || error.message)
      setOpen(true);

    } finally{
      setLoading(false);
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
      <div className='text-sm text-end hover:underline underline-offset-2 cursor-pointer' onClick={()=>{setDialogOpen(true)}}>Forgot Password?</div>
      <Button variant='contained' sx={{ width: "100%", marginInline: "auto" }} onClick={handleLogin}>
        {loading ? <CircularProgress size={"25px"} /> : "Sign In"}
      </Button>
      <AlertError open={open} onClose={handleClose} value={snackBarText} />
      <ForgotPasswordDialog open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  )
}
export default Login;