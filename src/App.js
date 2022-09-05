import "./App.css";
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Auth from './components/auth/Auth';
import ResetPassword from './components/auth/ResetPassword';
import { setUser } from './features/user';
import { getSupabaseData, unsetAll } from "./features/tasks";
import { getParamsByName } from './misc/getParamsByName';
import { supabase } from './supabaseClient'
import Main from "./components/Main";
import moment from 'moment-timezone';


const App = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.value);
  const [showResetPassword, setShowResetPassword] = useState(false);

  useEffect(() => {
    if (getParamsByName("type") === "recovery") {
      setShowResetPassword(true);
    }
    // eslint-disable-next-line
  }, [window.location.href])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUser(session));
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session));
    })
    // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    if (session){
      const getUserTasks = async (session) =>{
        let data = await supabase
        .from('tasks')
        .select(`taskid, checked,title, description, subtasks, startDate, endDate, priority`)
        .eq('uid', session.user.id)
        if (data.error && data.status !== 406) {
            console.error(data.error.message)
        }
        if (data.data) {
          dispatch(getSupabaseData(data.data));
        }
    }
    getUserTasks(session);
      
    }
    else{
      dispatch(unsetAll());
    }
    // eslint-disable-next-line
  }, [session])

  return (
    <>
      {!session ? <Auth /> : <Main />}

      <ResetPassword open={showResetPassword} setOpen={setShowResetPassword} />
    </>
  )
}

export default App