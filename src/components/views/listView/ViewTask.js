import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';
import Task from '../../task/Task';

const ViewTask = ({ taskState }) => {
    const tasks = useSelector((state) => state.tasks.value.tasks);
    const [task, setTask] = useState({ title: "", checked: false, priority: "On Deck", subtasks: [], startDate: moment.now(), endDate: moment.now() + 60 * 60 * 1000 });
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        setTask(tasks[tasks.findIndex((el) => { if (el.taskid === taskState.taskid) {return true} return false })]);
        // eslint-disable-next-line
    }, [taskState]);

    return (
        <>
            <Box sx={{minHeight: "10rem", backgroundColor: `var(--${taskState.priority.replace(/\s/gm, "")}, lime)`, opacity: taskState.checked ? "50%" : "100%" }} onClick={() => { setDrawerOpen(true) }} className='p-8 pb-16 relative w-full rounded-lg'>
                <div className="flex gap-2 items-end">
                    <div className='text-lg font-semibold'>
                        {taskState.title}
                    </div>
                    <div className='text-sm'>
                        {taskState.description}
                    </div>
                    <div>
                        {taskState.subTaskid ? `(${parseInt(taskState.subTaskid) + 1}/${taskState.subtaskTotal})` : ""}
                    </div>
                </div>
                <div >
                    {taskState.taskSubtask}
                </div>
                <div className='text-xs absolute bottom-2 right-2 p-4'>
                    <div className="text-end">Lasts {moment.duration(moment(taskState.endDate) - moment(taskState.startDate)).humanize()}</div>
                    <div className="">{`${moment(taskState.startDate).format("DD MMM hh:mm a")} - ${moment(taskState.endDate).format("DD MMM hh:mm a")}`}</div>
                </div>
            </Box>
            <Task open={drawerOpen} setOpen={setDrawerOpen} task={task} setTask={setTask} header="View Task" />
        </>
    )
}

export default ViewTask