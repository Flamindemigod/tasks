import React from 'react'
import Footer from './Footer';
import Header from './Header';
import AddTask from './task/AddTask';
import ListView from './views/listView/ListView';
const Main = () => {
    return (
        <>
            <Header />
            <div className='relative'>
                <ListView/>
                <AddTask />

                {/* {tasks.map((task)=>(<div key={task.taskid}><ViewTask taskState={task}/></div>))} */}
            </div>
            <Footer />
        </>
    )
}

export default Main