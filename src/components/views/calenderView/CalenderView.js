import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Calender from './Calender';

const CalenderView = () => {
    const tasks = useSelector((state) => state.tasks.value.tasks);
    const [sortedTasks, setSortedTasks] = useState([]);
    const [showCompleted, setShowCompleted] = useState(true);
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
        <div>
            <Calender tasks={sortedTasks} startDate={startDate} endDate={endDate}/>


        </div>
    )
}

export default CalenderView