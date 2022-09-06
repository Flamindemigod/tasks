import { Box, Button, ButtonGroup } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ListIcon from '@mui/icons-material/List';
import React from 'react'
import Footer from './Footer';
import Header from './Header';
import AddTask from './task/AddTask';
import CalenderView from './views/calenderView/CalenderView';
import ListView from './views/listView/ListView';
import { useState } from 'react';
const Main = () => {
    const [view, setView] = useState(false);
    return (
        <>
            <Header />
            <div className='relative'>
                <Box className='flex flex-col justify-center items-center'>
                  
                    <Box className="flex flex-col gap-4" sx={{ minHeight: "80vh", width: "min(95%, 80rem)" }} >
                    <ButtonGroup className="self-end" variant="outlined" aria-label="outlined primary button group view-selector">
                        <Button aria-label='Task List View' variant={!view ? "contained" : "outlined"} onClick={() => { setView(false) }}><ListIcon /></Button>
                        <Button aria-label='Task Calender View' variant={view ? "contained" : "outlined"} onClick={() => { setView(true) }}><CalendarTodayIcon /></Button>
                    </ButtonGroup>
                        {view ? <CalenderView /> : <ListView />}
                        </Box>
                </Box>
                <AddTask />

            </div>
            <Footer />
        </>
    )
}

export default Main