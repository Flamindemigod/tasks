import { Box } from '@mui/material'
import moment from 'moment'
import React from 'react'
import TaskEvent from './TaskEvent'

const Day = ({tasks = [], day}) => {
  
    return (
    <Box className='relative' sx={{height: 24*60}}>
        {tasks.map((task)=>(<TaskEvent key={task.taskid+"-"+task.subTaskid} task={task} currentDate={moment(day).clone()}/>))}
    </Box>
  )
}

export default Day