import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import AlertError from '../AlertError';
import AlertInfo from '../AlertInfo';
const ForgotPasswordDialog = ({ open, setOpen }) => {
    const [snackBarText, setSnackBarText] = useState("");
    const [email, setEmail] = useState("");
    const [snackbarOpenError, setSnackbarOpenError] = useState(false);
    const [snackbarOpenInfo, setSnackbarOpenInfo] = useState(false);
    const [loading, setLoading] = useState(false);


    const resetPassword = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.resetPasswordForEmail(email)
            if (error) throw error
            setSnackBarText("Check your email for password reset link")
            setSnackbarOpenInfo(true);

        } catch (error) {
            setSnackBarText(error.error_description || error.message)
            setSnackbarOpenError(true);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={() => { setOpen(false) }}
                fullWidth
                maxWidth={"sm"}>
                <DialogTitle>
                    Find Your Account
                </DialogTitle>
                <DialogContent>
                    <div className="pb-4">Please enter your email address to search for your account</div>
                    <TextField
                        fullWidth
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={resetPassword}>{loading ? <CircularProgress size={"25px"} /> : "Reset Password"}</Button>
                </DialogActions>
            </Dialog>
            <AlertError open={snackbarOpenError} onClose={() => { setSnackbarOpenError(false) }} value={snackBarText} />
            <AlertInfo open={snackbarOpenInfo} onClose={() => { setSnackbarOpenInfo(false) }} value={snackBarText} />

        </>
    )
}

export default ForgotPasswordDialog