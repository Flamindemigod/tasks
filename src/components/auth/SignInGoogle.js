import React from 'react'
import { supabase } from '../../supabaseClient'
import { Button } from '@mui/material'
import { Google } from '@mui/icons-material'
const SignInGoogle = () => {
    const handleLoginGoogle = async (e) => {
        try {
          const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
          if (error) throw error
        } catch (error) {
          alert(error.error_description || error.message)
        }
    
    
      }
    
    return (
        <Button variant='contained' color='secondary' sx={{ width: "100%", marginInline: "auto", display: "flex", gap: "0.5rem" }} onClick={handleLoginGoogle}>
            <Google /> Login with Google
        </Button>
    )
}

export default SignInGoogle