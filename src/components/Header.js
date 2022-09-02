import React from 'react'
import { supabase } from '../supabaseClient'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
const Header = () => {
    const session = useSelector((state) => state.user.value);


    return (
        <div className='w-full flex justify-between p-8 bg-primary-200 flex-col sm:flex-row'>
            <div className="text-xl italicp-4">Tasks</div>
            <div className='flex gap-4 items-center text-sm sm:text-base'>
                {session ? session.user.email : <></>}
                <Button variant='contained' onClick={() => { supabase.auth.signOut() }}>Logout</Button>
            </div>
        </div>
    )
}

export default Header