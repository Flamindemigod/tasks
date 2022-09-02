import React, { useEffect, useState } from 'react'
import { Box, Checkbox, FormControl, FormLabel, IconButton, Menu, TextField, Typography } from '@mui/material'
import { Add, Circle, CircleOutlined, DeleteOutline, Timer } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';

const SubTask = ({ index, task, setTask }) => {
    const [checked, setChecked] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);

    useEffect(() => {
        setChecked(task.subtasks[index].checked);
    }, [task.subtasks]);
    return (
        <>
        <Box className='flex w-full items-center gap-2'>
            <Checkbox icon={<CircleOutlined />} checkedIcon={<Circle />} checked={checked} inputProps={{ 'aria-label': 'controlled' }} onChange={(e) => { setTask(state => ({ ...state, subtasks: state.subtasks.map((el, i) => ((i === index) ? { ...state.subtasks[i], checked: !checked } : el)) })) }} />
            <TextField fullWidth multiline sx={{ textDecoration: checked ? "line-through" : "none" }} value={task.subtasks[index].title} onChange={(e) => { setTask(state => ({ ...state, subtasks: state.subtasks.map((el, i) => ((i === index) ? { ...state.subtasks[i], title: e.target.value } : el)) })) }} />
            <Timer className='hover:text-blue-600' onClick={(e)=>{setMenuOpen(true); setMenuAnchor(e.currentTarget)}}/>
            <DeleteOutline className='hover:text-red-600' onClick={() => { setTask(state => ({ ...state, subtasks: state.subtasks.filter((subtask, i) => { return (i !== index ? subtask : null) }) })) }} />
        </Box>
        <Menu open={menuOpen} anchorEl={menuAnchor} onClose={()=>{setMenuOpen(false)}}>
            <Box className='p-8'>
            <FormControl fullWidth sx={{mt:2}}>
                    <Box className='flex flex-wrap gap-2 justify-evenly '>
                    <DateTimePicker
                        label="Start Date and Time"
                        value={task.subtasks[index].startDate}
                        inputFormat="DD/MM/yyyy HH:mm"
                        onChange={(val) => { setTask(state => ({ ...state, subtasks: state.subtasks.map((el, i) => ((i === index) ? { ...state.subtasks[i], startDate: val} : el)) })) }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                
                    <DateTimePicker
                        label="End Date and Time"
                        value={task.subtasks[index].endDate}
                        inputFormat="DD/MM/yyyy HH:mm"
                        onChange={(val) => { setTask(state => ({ ...state, subtasks: state.subtasks.map((el, i) => ((i === index) ? { ...state.subtasks[i], endDate: val} : el)) })) }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    </Box>
                </FormControl>
            </Box>
        </Menu>
        </>
    );
}

const SubTasks = ({ task, setTask }) => {
    return (
        <FormControl fullWidth className='flex flex-col gap-4'>
            <FormLabel id="subtasks-list" className='mt-4'>Subtasks</FormLabel>
            {task.subtasks.map((_, index) => (
                <SubTask task={task} setTask={setTask} index={index} />
            ))}
            <IconButton onClick={() => { setTask(state => ({ ...state, subtasks: [...state.subtasks, { title: "", checked: false, startDate: moment.now(), endDate: moment.now() + 60*60*1000 }] })) }}>
                <Add />
            </IconButton>
        </FormControl>
    )
}

export default SubTasks