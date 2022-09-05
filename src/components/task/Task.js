import React from 'react'
import { Box, Drawer, FormControl, TextField, FormLabel, Checkbox, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import SubTasks from './SubTasks'
import { Circle, CircleOutlined } from '@mui/icons-material';
import DeleteTask from './DeleteTask';
import { supabase } from '../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { addTask, updateTask } from "../../features/tasks"
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import AlertError from "../AlertError";


moment.fn.toJSON = function() {
    return this.toISOString(true);
  };

const Task = ({ open, setOpen, task, setTask, header = "" }) => {
    const dispatch = useDispatch();
    const session = useSelector((state) => state.user.value);

    const upsertTask = async () => {
        if (!task.title){

            return
        }
        setOpen(false);
        const taskID = task.taskid || uuidv4();
        const upsert = task.taskid ? updateTask : addTask
        let { error } = await supabase.from('tasks').upsert({ uid: session.user.id, taskid: taskID, checked: task.checked, title: task.title, description: task.description, subtasks: task.subtasks, startDate: moment(task.startDate).toJSON(), endDate: moment(task.endDate).toJSON(), priority: task.priority }, {
            returning: 'minimal', // Don't return the value after inserting
        })
        if (error) {
            console.error(error)
        }
        dispatch(upsert({ ...task, taskid: taskID }));
        setTask({ taskid: null, title: "", description: "", priority: "On Deck", subtasks: [], startDate: moment.now(), endDate: moment.now() + 60 * 60 * 1000 });
    }
    return (
        <>
        <Drawer
            anchor={"right"}
            open={open}
            onClose={() => { setOpen(false) }}
            PaperProps={{ sx: { width: "90%", maxWidth: "40rem" } }}
        >
            <Box className=' w-full' >
                <Box className='px-8 py-8' sx={{ backgroundColor: `var(--${task.priority.replace(/\s/gm, "")}, lime)` }}>
                    <Box className='text-xl  mb-4'>{header}</Box>
                    {/* Task Title */}
                    <FormControl fullWidth>
                        <Box className='flex flex-row gap-4'>
                            
                            <FormControlLabel
                                control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} icon={<CircleOutlined />} checkedIcon={<Circle />} checked={task.checked} onChange={(e) => { setTask(state => ({ ...state, checked: !state.checked })) }} />}
                                label="Completed"
                                labelPlacement="bottom"
                            />
                            <TextField
                                fullWidth
                                multiline
                                sx={{ textDecoration: task.checked ? "line-through" : "none" }}
                                label="Task Title"
                                value={task.title}
                                onChange={(e) => { setTask(state => ({ ...state, title: e.target.value })) }}
                            />
                            {task.taskid ? <DeleteTask task={task} /> : <></>}
                        </Box>
                    </FormControl>
                </Box>
                <Box className='px-8'>
                    {/* Task Priority */}
                    <FormControl fullWidth >
                        <FormLabel id="radio-buttons-priority" className='mt-4'>Priority</FormLabel>
                        <RadioGroup
                            aria-labelledby="radio-buttons-priority-label"
                            defaultValue="On Deck"
                            name="radio-buttons-priority-group"
                            row
                            value={task.priority}
                            onChange={(e, val) => { setTask(state => ({ ...state, priority: val })) }}
                            sx={{ "justifyContent": "center" }}
                        >
                            <FormControlLabel labelPlacement='bottom' value="Critical" control={<Radio />} label="Critical" />
                            <FormControlLabel labelPlacement='bottom' value="Do Next" control={<Radio />} label="Do Next" />
                            <FormControlLabel labelPlacement='bottom' value="Lower Priority" control={<Radio />} label="Lower Priority" />
                            <FormControlLabel labelPlacement='bottom' value="On Deck" control={<Radio />} label="On Deck" />
                        </RadioGroup>
                    </FormControl>
                    {/* Description */}
                    <FormControl
                        sx={{ mt: 2 }}
                        fullWidth
                        name="task-description">
                        <TextField
                            fullWidth
                            label="Task Description"
                            value={task.description}
                            onChange={(e) => { setTask(state => ({ ...state, description: e.target.value })) }} />
                    </FormControl>
                    {/* SubTasks */}
                    <SubTasks task={task} setTask={setTask} />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Box className='flex flex-wrap gap-2 justify-evenly '>
                            <DateTimePicker
                                label="Start Date and Time"
                                value={task.startDate}
                                inputFormat="DD/MM/yyyy HH:mm"
                                onChange={(val) => { setTask(state => ({ ...state, startDate: moment(val).tz(moment.tz.guess()) })) }}
                                renderInput={(params) => <TextField {...params} />}
                            />

                            <DateTimePicker
                                label="End Date and Time"
                                value={task.endDate}
                                inputFormat="DD/MM/yyyy HH:mm"
                                onChange={(val) => { setTask(state => ({ ...state, endDate: moment(val) })) }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                    </FormControl>
                    <Box className='flex justify-end w-full p-4'>
                        <Button variant='contained' onClick={upsertTask}>Save Task</Button>
                    </Box>
                </Box>
            </Box>
        </Drawer>
        <AlertError />
        </>
    )
}

export default Task