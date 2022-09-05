import { useState, useEffect } from 'react'
import ViewTask from './ViewTask'
import { useSelector } from 'react-redux';
import { Autocomplete, Box, Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import moment from 'moment';
import { DateTimePicker } from '@mui/x-date-pickers';
const ListView = () => {
    const tasks = useSelector((state) => state.tasks.value.tasks);
    const [sortedTasks, setSortedTasks] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);
    const [startDate, setStartDate] = useState(moment({ hour: 0 }));
    const [endDate, setEndDate] = useState(moment({ hour: 23, minute: 59, second: 59 }));
    const [priorityWhitelist, setPriorityWhitelist] = useState(["Critical", "Do Next", "Lower Priority", "On Deck"]);


    const sortTasks = () => {
        const _tasks = tasks;
        let _sortedTasks = [];
        for (const _task in _tasks) {
            if (_tasks[_task].subtasks.length) {
                for (const _subtask in _tasks[_task].subtasks) {
                    _sortedTasks.push({ title: _tasks[_task].title, priority: _tasks[_task].priority, checked: _tasks[_task].subtasks[_subtask].checked, subTaskid: _subtask, subtaskTotal: _tasks[_task].subtasks.length, description: _tasks[_task].description, taskid: _tasks[_task].taskid, taskSubtask: _tasks[_task].subtasks[_subtask].title, startDate: _tasks[_task].subtasks[_subtask].startDate, endDate: _tasks[_task].subtasks[_subtask].endDate })
                }
            } else {
                _sortedTasks.push({ title: _tasks[_task].title, priority: _tasks[_task].priority, checked: _tasks[_task].checked, description: _tasks[_task].description, taskid: _tasks[_task].taskid, startDate: _tasks[_task].startDate, endDate: _tasks[_task].endDate })
            }
        }
        _sortedTasks.sort((a, b) => (moment(a.startDate) - moment(b.startDate)))
        // Filters
        //Is Completed
        if (!showCompleted) {
            _sortedTasks = _sortedTasks.filter((el) => { if (el.checked) { return false } return true })
        }

        //Is in Priority Whitelist
        _sortedTasks = _sortedTasks.filter(el=>{
            return priorityWhitelist.includes(el.priority)
        })


        //Is Within Date range
        _sortedTasks = _sortedTasks.filter(el => {
            if (moment(el.startDate).isBetween(startDate, endDate) || moment(el.endDate).isBetween(startDate, endDate) || moment(startDate).isBetween(el.startDate, el.endDate)) {
                return true
            }
            return false
        })
        
        setSortedTasks(_sortedTasks)
    }
    useEffect(sortTasks, [tasks, showCompleted, startDate, endDate, priorityWhitelist])
    return (
        <>

            <Box className='flex flex-col md:flex-row justify-center items-center md:items-start w-full '>
                {/* Task Filters */}
                <div>
                    <div className='text-xl'>Task Filters</div>
                    <div className="flex flex-col gap-8">
                        <FormControlLabel
                            value="end"
                            control={<Checkbox checked={showCompleted} onChange={() => { setShowCompleted(state => !state) }} />}
                            label="Show Completed"
                            labelPlacement="end"
                        />
                        <FormControl>
                            <Autocomplete
                            sx={{maxWidth:"16rem"}}
                                multiple
                                id="tags-standard"
                                options={["Critical", "Do Next", "Lower Priority", "On Deck"]}
                                value={priorityWhitelist}
                                onChange={(e, newVal)=>{setPriorityWhitelist(newVal)}}
                                getOptionLabel={(option) => option}
                                defaultValue={["Critical", "Do Next", "Lower Priority", "On Deck"]}
                                renderInput={(params) => (
                                    <TextField
                                        multiline
                                        {...params}
                                        variant="standard"
                                        label="Priority"
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <DateTimePicker
                                label="Start Date and Time"
                                value={startDate}
                                inputFormat="DD/MM/yyyy HH:mm"
                                onChange={(val) => { setStartDate(val) }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
                        <FormControl>
                            <DateTimePicker
                                label="End Date and Time"
                                value={endDate}
                                inputFormat="DD/MM/yyyy HH:mm"
                                onChange={(val) => { setEndDate(val) }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
                    </div>
                </div>
                <Box sx={{ width: "clamp(15rem, 100%, 60rem)" }} className='p-8 flex flex-col gap-4 items-center'>
                    {sortedTasks.map((task) => (<div className="w-full task" key={`${task.taskid}-${task.subTaskid}`}>
                        <ViewTask taskState={task} />
                    </div>))}
                </Box>

            </Box>
        </>)
}

export default ListView