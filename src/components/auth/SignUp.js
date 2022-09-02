import { supabase } from '../../supabaseClient'
import React, { useState } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import AlertError from '../AlertError';
import AlertInfo from '../AlertInfo';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");


  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  const handleCloseInfo = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenInfo(false);
  };


  const handleSignUp = async (e) => {
    e.preventDefault()

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      setSnackBarText('Check your email!')
      setOpenInfo(true)
    } catch (error) {
      setSnackBarText(error.error_description || error.message)
      setOpenError(true)
    } finally {
      setLoading(false);
    }
  }
  return (
    <div >
      <form className='flex flex-col gap-2'>
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
        <div className='text-sm text-end'>Password should be atleast 6 characters</div>
        <Button type="submit" variant='contained' sx={{ width: "100%", marginInline: "auto" }} onClick={handleSignUp}>
          {loading ? <CircularProgress size={"25px"} /> : "Sign Up"}
        </Button>
      </form>
      <AlertError open={openError} onClose={handleCloseError} value={snackBarText} />
      <AlertInfo open={openInfo} onClose={handleCloseInfo} value={snackBarText} />
    </div>
  )
}

export default SignUp