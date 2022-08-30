import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Auth from './components/auth/Auth';
import { setUser } from './features/user';
import { supabase } from './supabaseClient'

const App = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.value);

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
    </div>
  )
}

export default App