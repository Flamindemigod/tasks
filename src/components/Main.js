import React from 'react'
import Footer from './Footer';
import Header from './Header';
import AddTask from './task/AddTask';
import DeleteTask from './task/DeleteTask';

import {useSelector } from 'react-redux';
import ViewTask from './task/ViewTask';
const Main = () => {
  const tasks = useSelector((state) => state.tasks.value.tasks);
    return (
        <>
            <Header />
            <div className='relative'>
                
                <AddTask />
                {tasks.map((task)=>(<div key={task.taskid}><ViewTask taskState={task}/> <DeleteTask task={task} /></div>))}
            </div>
            <Footer />
        </>
    )
}

export default Main