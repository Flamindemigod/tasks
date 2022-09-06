import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Calender from './Calender';
import { Box, FormControlLabel, Checkbox, FormControl, Autocomplete, TextField, Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const CalenderView = () => {
    const tasks = useSelector((state) => state.tasks.value.tasks);
    const [sortedTasks, setSortedTasks] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());
    const [priorityWhitelist, setPriorityWhitelist] = useState(["Critical", "Do Next", "Lower Priority", "On Deck"]);

    useEffect(()=>{
        setStartDate(moment().weekday(0).startOf("day"));
        setEndDate(moment().weekday(6).endOf("day"))
    }, [])

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
        _sortedTasks = _sortedTasks.filter(el => {
            return priorityWhitelist.includes(el.priority)
        })


        //Is Within Date range
        _sortedTasks = _sortedTasks.filter(el => {
            if (moment(el.startDate).isBetween(startDate, endDate, "[]") || moment(el.endDate).isBetween(startDate, endDate, "[]") || moment(startDate).isBetween(el.startDate, el.endDate, "[]")) {
                return true
            }
            return false
        })

        setSortedTasks(_sortedTasks)
    }
    useEffect(sortTasks, [tasks, showCompleted, startDate, endDate, priorityWhitelist])
    return (
        <div className='flex flex-col gap-8 md:flex-row justify-center items-center md:items-start w-full'>
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
                    </div>
                </div>
            <div className="w-full">
                <div className='flex w-full justify-center items-center'>
                    <Button onClick={()=>{setStartDate(state => (state.clone().subtract(7, "d"))); setEndDate(state => (state.clone().subtract(7, "d")))}}>
                        <ArrowBackIos />
                    </Button>
                    <div>
                        {`${startDate.format("DD MMM YYYY")} - ${endDate.format("DD MMM YYYY")}`}
                    </div>
                    <Button onClick={()=>{setStartDate(state => (state.clone().add(7, "d"))); setEndDate(state => (state.clone().add(7, "d")))}}>
                        <ArrowForwardIos />
                    </Button>
                </div>
                <Calender tasks={sortedTasks} startDate={startDate} endDate={endDate}/>
            </div>

        </div>
    )
}

export default CalenderView