import { Box } from '@mui/material';
import moment from 'moment';
import { useState, useEffect } from 'react';
import Task from '../../task/Task';
import { useSelector } from 'react-redux';
import { minHeight } from '@mui/system';
const TaskEvent = ({ task, currentDate }) => {
  const tasks = useSelector((state) => state.tasks.value.tasks);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [taskState, setTaskState] = useState({ title: "", checked: false, priority: "On Deck", subtasks: [], startDate: moment.now(), endDate: moment.now() + 60 * 60 * 1000 });

  useEffect(() => {
    setTaskState(tasks[tasks.findIndex((el) => { if (el.taskid === task.taskid) { return true } return false })]);
    // eslint-disable-next-line
  }, [task]);

  const getTop = (taskStart, currentDate) => {
    const momentTaskStart = moment(taskStart);
    if (momentTaskStart.isBetween(currentDate, currentDate.clone().add(1, "d").endOf("day"), "day", "[)")) {
      return (moment.duration(momentTaskStart.diff(currentDate)).asMinutes())
    }
  }

  const getHeight = (taskStart, taskEnd, currentDate) => {
    const momentTaskStart = moment(taskStart);
    const momentTaskEnd = moment(taskEnd);
    let start = moment();
    let end = moment();
    if (momentTaskStart.isSame(currentDate, "day")) {
      start = moment(momentTaskStart);
    }
    else {
      start = moment(currentDate);
    }
    if (momentTaskEnd.isSame(currentDate, "day")) {
      end = momentTaskEnd;
    } else {
      end = currentDate.clone().endOf("day")
    }
    return moment.duration(end.diff(start)).asMinutes();
  }
  return (
    <>
      <Box
        onClick={() => { setDrawerOpen(true) }}
        className="absolute w-full rounded-md overflow-auto"
        sx={{
          backgroundColor: `var(--${task.priority.replace(/\s/gm, "")})`,
          top: `${getTop(task.startDate, moment(currentDate).clone())}px`,
          height: `${getHeight(task.startDate, task.endDate, moment(currentDate).clone())}px`,
          minHeight:"30px",
          opacity: task.checked ? "0.5": "1"
        }}
      >
        <div className="flex">
          <div className='font-semibold w-full'>{task.title}</div>
          <div>
            {task.subTaskid ? `(${parseInt(task.subTaskid) + 1}/${task.subtaskTotal})` : ""}
          </div>
        </div>
        <div>{task.taskSubtask}</div>
        <div>Lasts {moment.duration(moment(task.endDate).diff(task.startDate)).humanize()}</div>
      </Box>
      <Task open={drawerOpen} setOpen={setDrawerOpen} task={taskState} setTask={setTaskState} header="View Task" />
    </>
  )
}

export default TaskEvent