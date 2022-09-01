import React from 'react'
import { Box, Drawer, FormControl, TextField, FormLabel, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import SubTasks from './SubTasks'

const Task = ({ open, setOpen, task, setTask, header = "" , onSave}) => {
    return (
        <Drawer
            anchor={"right"}
            open={open}
            onClose={() => { setOpen(false) }}
            PaperProps={{ sx: { width: "90%", maxWidth: "40rem" } }}
        >
            <Box className='p-8 w-full' >
                <Box className='text-xl mb-4'>{header}</Box>
                {/* Task Title */}
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        label="Task Title"
                        value={task.title}
                        onChange={(e) => { setTask(state => ({ ...state, title: e.target.value })) }}
                    />
                </FormControl>
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
                            onChange={(val) => { setTask(state => ({ ...state, startDate: val })) }}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <DateTimePicker
                            label="End Date and Time"
                            value={task.endDate}
                            inputFormat="DD/MM/yyyy HH:mm"
                            onChange={(val) => { setTask(state => ({ ...state, endDate: val })) }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                </FormControl>
                <Box className='flex justify-end w-full p-4'>
                    <Button  variant='contained' onClick={onSave}>Save Task</Button>
                </Box>
            </Box>
        </Drawer>
    )
}

export default Task