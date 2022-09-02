import React from 'react'
import { useDispatch } from 'react-redux';
import { supabase } from '../../supabaseClient';
import {deleteTask} from "../../features/tasks"
import { IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
const DeleteTask = ({ task }) => {
    const dispatch = useDispatch();
    const deleteTask_ = async () => {
        let { error } = await supabase.from('tasks').delete().match({taskid: task.taskid})
        if (error) {
            console.error(error)
        }
        dispatch(deleteTask(task));
    }



    return (
        <>
            <IconButton  className='hover:text-red-600' onClick={deleteTask_}>
                <DeleteOutlined />
            </IconButton>
        </>
    )
}

export default DeleteTask