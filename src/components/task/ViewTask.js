import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../features/tasks';
import moment from 'moment';
import Task from './Task';
import { supabase } from '../../supabaseClient';

const ViewTask = ({ taskState }) => {
    const dispatch = useDispatch();
    const session = useSelector((state) => state.user.value);

    const [task, setTask] = useState({title: "", checked:false, priority: "On Deck", subtasks:[], startDate: moment.now(), endDate: moment.now() + 60*60*1000});
    const [drawerOpen, setDrawerOpen] = useState(false);

    const updateTasks = async () => {
        let { error } = await supabase.from('tasks').upsert({ uid: session.user.id, taskid: task.taskid, checked: task.checked, title: task.title, description: task.description, subtasks: task.subtasks, startDate: moment(task.startDate).toString(), endDate: moment(task.endDate).toString(), priority: task.priority }, {
            returning: 'minimal', // Don't return the value after inserting
        })
        if (error) {
            console.error(error)
        }
        dispatch(updateTask(task));
        setDrawerOpen(false);
    }


    useEffect(() => {
        setTask(taskState);
    }, [taskState]);

    return (
        <> 
            <div>{JSON.stringify(task)}</div>
            
            <div>{JSON.stringify(taskState)}</div>
            <Button onClick={()=>{setDrawerOpen(true)}}>ViewTask</Button>
            <Task open={drawerOpen} setOpen={setDrawerOpen} task={task} setTask={setTask} header="View Task" onSave={updateTasks} />
        </>
    )
}

export default ViewTask