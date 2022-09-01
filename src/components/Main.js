import React from 'react'
import Footer from './Footer';
import Header from './Header';
import AddTask from './task/AddTask';

const Main = () => {
    return (
        <>
            <Header />
            <div className='relative'>
                
                <AddTask />
            </div>
            <Footer />
        </>
    )
}

export default Main