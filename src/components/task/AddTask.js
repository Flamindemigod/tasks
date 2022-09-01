import { Add } from '@mui/icons-material'
import { Fab, Drawer, TextField } from '@mui/material'
import React, { useState } from 'react'
import Task from './Task';
import moment from 'moment';
import {addTask} from "../../features/tasks"
import { useDispatch, useSelector} from 'react-redux';
import { supabase } from '../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';
const AddTask = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.user.value);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [task, setTask] = useState({title: "", checked:false, priority: "On Deck", subtasks:[], startDate: moment.now(), endDate: moment.now() + 60*60*1000});
  
  const updateTasks = async () =>{
    const taskID= uuidv4();
    setTask(state => ({...state, taskid:taskID }));

    let { error } = await supabase.from('tasks').upsert({ uid: session.user.id,taskid:taskID, checked: task.checked,title: task.title, description: task.description, subtasks: task.subtasks, startDate:moment(task.startDate).toString(), endDate: moment(task.endDate).toString(), priority: task.priority}, {
      returning: 'minimal', // Don't return the value after inserting
    })
    if (error) {
      console.error(error)
    }
    dispatch(addTask({...task, taskid: taskID}));
    setDrawerOpen(false);
    setTask({title: "", priority: "On Deck", subtasks:[], startDate: moment.now(), endDate: moment.now() + 60*60*1000});
  }

  return (
    <>
      <Fab color="primary" sx={{ position: "absolute", bottom: 16, right: 16 }} onClick={() => { setDrawerOpen(true) }} aria-label="add task">
        <Add />
      </Fab>
      <Task open={drawerOpen} setOpen={setDrawerOpen} task={task} setTask={setTask} header="Add Task" onSave={updateTasks}/>
    </>
  )
}

export default AddTask