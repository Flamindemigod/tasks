import React from 'react'
import Footer from './Footer';
import Header from './Header';
import AddTask from './task/AddTask';
import CalenderView from './views/calenderView/CalenderView';
import ListView from './views/listView/ListView';
const Main = () => {
    return (
        <>
            <Header />
            <div className='relative'>
                {/* <ListView/> */}
                <CalenderView />
                <AddTask />

            </div>
            <Footer />
        </>
    )
}

export default Main