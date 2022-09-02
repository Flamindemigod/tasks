import React from 'react'
import { FormControlLabel, Checkbox } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react';
const TaskFilter = ({tasks, setTasks, onChange}) => {
    const [showCompleted, setShowCompleted] = useState(false);
    useEffect(()=>{
        let sortedTasks = tasks;
        if (!showCompleted){
            sortedTasks = sortedTasks.filter((el)=>{if (el.checked){return false} return true})
        }

        setTasks(sortedTasks)
    }, [tasks, showCompleted])
    return (
        <div>
            <div className='text-xl'>Task Filters</div>
            <FormControlLabel
                sx={{ marginLeft: "auto" }}
                value="end"
                control={<Checkbox checked={showCompleted} onChange={() => { setShowCompleted(state => !state) }} />}
                label="Show Completed"
                labelPlacement="end"
            />
        </div>
    )
}

export default TaskFilter