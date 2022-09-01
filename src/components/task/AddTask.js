import { Add } from '@mui/icons-material'
import { Fab, Drawer, TextField } from '@mui/material'
import React, { useState } from 'react'
import Task from './Task';
import moment from 'moment';

const AddTask = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [task, setTask] = useState({title: "", priority: "On Deck", subtasks:[], startDate: moment.now(), endDate: moment.now() + 60*60*1000});

  return (
    <>
      <Fab color="primary" sx={{ position: "absolute", bottom: 16, right: 16 }} onClick={() => { setDrawerOpen(true) }} aria-label="add task">
        <Add />
      </Fab>
      <Task open={drawerOpen} setOpen={setDrawerOpen} task={task} setTask={setTask} header="Add Task"/>
    </>
  )
}

export default AddTask