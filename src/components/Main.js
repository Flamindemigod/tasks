import React from 'react'
import Footer from './Footer';
import Header from './Header';
import AddTask from './task/AddTask';

import {useSelector } from 'react-redux';
const Main = () => {
  const tasks = useSelector((state) => state.tasks.value.tasks);
    return (
        <>
            <Header />
            <div className='relative'>
                
                <AddTask />
                {JSON.stringify(tasks)}
            </div>
            <Footer />
        </>
    )
}

export default Main