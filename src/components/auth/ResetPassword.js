import { Close } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, CircularProgress, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { supabase } from '../../supabaseClient';
import AlertError from '../AlertError';
const ResetPassword = ({open, setOpen}) => {
    const [password, setPassword] = useState("");
    const [snackbarOpenError, setSnackbarOpenError] = useState(false);
    const [snackBarText, setSnackBarText] = useState("");
    const [loading, setLoading] = useState(false);
    const resetPassword = async () =>{
        try{
            setLoading(true);
            const {error} = await supabase.auth.updateUser({password});
            if (error) throw error
            setOpen(false);


        }  catch (error) {
            setSnackBarText(error.error_description || error.message);
            setSnackbarOpenError(true);
          } finally{
            setLoading(false);
          }
    }
  return (
    <>
    <Dialog
    open={open}
    fullWidth
    maxWidth={"sm"}>
        <DialogTitle>
        <IconButton
              edge="start"
              color="inherit"
              onClick={()=>{setOpen(false)}}
              aria-label="close"
            >
              <Close />
            </IconButton>
          Reset Password
        
        </DialogTitle>
        <DialogContent>
        <div className="pb-4">Enter your new Password below</div>
        <TextField
        fullWidth
        label="Password"
        id="password"
        type="password"
        placeholder="Your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="text-sm text-end">Password must be atleast 6 characters</div>
        </DialogContent>
        <DialogActions>
            <Button onClick={resetPassword}>{loading ? <CircularProgress size={"25px"} /> : "Reset Password"}</Button>
        </DialogActions>
    </Dialog>
    <AlertError open={snackbarOpenError} onClose={()=>{setSnackbarOpenError(false)}} value={snackBarText} />
    </>
  )
}

export default ResetPassword