import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Auth from './components/auth/Auth';
import ResetPassword from './components/auth/ResetPassword';
import { setUser } from './features/user';
import { getParamsByName } from './misc/getParamsByName';
import { supabase } from './supabaseClient'

const App = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.value);
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(()=>{if (getParamsByName("type") === "recovery"){
    console.log("test")
    setShowResetPassword(true);
  }}, [window.location.href])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUser(session));
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session));
    })
  }, [])
  return (
    <div>
      {!session ? <Auth /> : <></>}
      <ResetPassword open={showResetPassword} setOpen={setShowResetPassword}/>
    </div>
  )
}

export default App